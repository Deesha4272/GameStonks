/*
 * API for interacting with GameStonks
 *
 * GameStonks API 
 *
 * API version: 1.0.0
 * Generated by: OpenAPI Generator (https://openapi-generator.tech)
 */

package openapi

import (
	"context"
	"errors"
	"fmt"
	"github.com/jackc/pgtype"
	"log"
	"net/http"
	"strconv"
)

// StockApiService is a service that implents the logic for the StockApiServicer
// This service should implement the business logic for every endpoint for the StockApi API. 
// Include any external packages or services that will be required by this service.
type StockApiService struct {
}

// NewStockApiService creates a default api service
func NewStockApiService() StockApiServicer {
	return &StockApiService{}
}

func getStockIdFromDatabase(tickerSymbol string) (int, error){
	rows, err := databaseConnection.Query(context.Background(), "SELECT * FROM Stocks WHERE ticker_symbol=$1;", tickerSymbol)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	fmt.Println("READING FROM DB")

	for rows.Next() {
		var id int64
		var ticker string
		if err := rows.Scan(&id,&ticker); err != nil {
			print(err.Error())
			log.Fatal("Error reading from Stocks table.")
		}
		fmt.Println("READ id" + strconv.Itoa(int(id)) + " ticker symbol " + ticker)
		return int(id), err
	}
	return -1, err
}

func insertNewCommentToDatabase(stockId int, comment string, commenter string)( error){
	_, err := databaseConnection.Exec(context.Background(), "INSERT INTO Comments (stock_id, date, comment, commenter) VALUES ($1, current_date, $2, $3)", stockId, comment, commenter)
	return err
}

func insertNewVoteToDatabase(stockId int, voter string)( error){
	_, err := databaseConnection.Exec(context.Background(), "INSERT INTO Votes (stock_id, date, voter) VALUES ($1, current_date, $2)", stockId, voter)
	return err
}

// AddNewComment - Add a comment to a stock
func (s *StockApiService) AddNewComment(ctx context.Context, stockTicker string, comment string, commenter string) (ImplResponse, error) {
	id, err := getStockIdFromDatabase(stockTicker)
	if err != nil {
		log.Fatal(err.Error())
	}
	if id == -1{
		return Response(http.StatusNotFound, nil),nil
	}
	err = insertNewCommentToDatabase(id, comment, commenter)
	if err == nil{
		return Response(http.StatusCreated, nil),nil
	}else{
		log.Fatal(err.Error())
		return Response(http.StatusBadRequest, nil),nil
	}
}

// AddNewVote - Add a vote to a stock
func (s *StockApiService) AddNewVote(ctx context.Context, stockTicker string, voter string) (ImplResponse, error) {
	id, err := getStockIdFromDatabase(stockTicker)
	if err != nil {
		log.Fatal(err.Error())
	}
	if id == -1{
		return Response(http.StatusNotFound, nil),nil
	}
	err = insertNewVoteToDatabase(id, voter)
	if err == nil{
		return Response(http.StatusCreated, nil),nil
	}else{
		log.Fatal(err.Error())
		return Response(http.StatusBadRequest, nil),nil
	}
}

func getStocksFromDatabase() ([]Stock, error){
	rows, err := databaseConnection.Query(context.Background(), "SELECT * FROM Stocks;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var stocks []Stock
	var counter = 0
	fmt.Println("READING FROM DB")

	for rows.Next() {
		var id int64
		var tickerSymbol string
		if err := rows.Scan(&id, &tickerSymbol); err != nil {
			log.Fatal("Error reading from Stocks table.")
		}
		fmt.Println("READ id" + strconv.Itoa(int(id)) + " ticker symbol " + tickerSymbol)

		stock := Stock{
			Id: int(id),
			Ticker: tickerSymbol,
		}
		stocks = append(stocks, stock)
		counter++
	}
	return stocks, err
}

func getCommentsFromStock(stockId int)([]Comment, error){
	rows, err := databaseConnection.Query(context.Background(), "SELECT * FROM Comments WHERE stock_id=$1;", strconv.Itoa(stockId))
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var comments []Comment
	var counter = 0

	for rows.Next() {
		var id int64
		var date pgtype.Date
		var comment string
		var commenter string

		if err := rows.Scan(&id, &date, &comment, &commenter); err != nil {
			print(err.Error())
			log.Fatal("Error reading from Comments table.")
		}
		fmt.Println("READ id" + strconv.Itoa(int(id)) + " date "+ date.Time.String() + " commenter " + commenter+ " comment " + comment)

		commentObj := Comment{
			Commenter: commenter,
			Date: date.Time.String(),
			Comment: comment,
		}
		comments = append(comments, commentObj)
		counter++
	}
	return comments, err
}

func getVotesForStock(stockId int)(int, error){
	rows, err := databaseConnection.Query(context.Background(), "SELECT COUNT(*) as count FROM Votes WHERE stock_id=$1;", strconv.Itoa(stockId))
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	count := 0
	for rows.Next() {
		if err := rows.Scan(&count); err != nil {
			log.Fatal(err.Error())
		}
		return count, nil
	}
	return count, nil
}


// GetAllStocks - Gets all stocks on the platform within a date range
func (s *StockApiService) GetAllStocks(ctx context.Context, since string, until string) (ImplResponse, error) {
	rawStocks, err := getStocksFromDatabase()
	if err != nil {
		return Response(http.StatusBadRequest, nil),nil
	}

	var stocks []StockData
	for _, element := range rawStocks {
		comments, err := getCommentsFromStock(element.Id)
		if err != nil {
			return Response(http.StatusBadRequest, nil),err
		}
		votes, err := getVotesForStock(element.Id)
		if err != nil {
			return Response(http.StatusBadRequest, nil),err
		}
		stockData := StockData{
			Stock: element,
			VoteCount: votes,
			Comments: comments,
		}
		stocks = append(stocks, stockData)
	}

	// Add api_stock_service.go to the .openapi-generator-ignore to avoid overwriting this service implementation when updating open api generation.
	return Response(http.StatusOK, stocks),nil
}

// GetIndividualStock - Returns a stock&#39;s vote count and comments
func (s *StockApiService) GetIndividualStock(ctx context.Context, stockTicker string) (ImplResponse, error) {

	//TODO: Uncomment the next line to return response Response(200, map[string]int32{}) or use other options such as http.Ok ...
	//return Response(200, map[string]int32{}), nil

	//TODO: Uncomment the next line to return response Response(404, {}) or use other options such as http.Ok ...
	//return Response(404, nil),nil

	return Response(http.StatusNotImplemented, nil), errors.New("GetIndividualStock method not implemented")
}

func insertNewStockIntoDatabase(tickerSymbol string) error {
	_, err := databaseConnection.Exec(context.Background(), "INSERT INTO Stocks (ticker_symbol) VALUES ($1)", tickerSymbol)
	return err
}

// InsertIndividualStock - Create a new stock ticker for tracking
func (s *StockApiService) InsertIndividualStock(ctx context.Context, stockTicker string) (ImplResponse, error) {
	err := insertNewStockIntoDatabase(stockTicker)
	if err != nil {
		return Response(http.StatusBadRequest, nil),err
	}
	return Response(http.StatusCreated, nil), nil
}

