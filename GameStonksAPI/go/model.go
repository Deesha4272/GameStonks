package openapi

type Stock struct{
	Id	int
	Ticker    string `json:"ticker_symbol"`
}

type Comment struct{
	Commenter string `json:"commenter"`
	Date string `json:"date"`
	Comment string `json:"comment"`
}

type StockData struct {
	Stock Stock `json:"stock""`
	VoteCount int `json:"vote_count"`
	Comments []Comment `json:"comments"`
}
