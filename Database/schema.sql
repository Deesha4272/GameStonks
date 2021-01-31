CREATE TABLE Stocks (
    id SERIAL NOT NULL,
    ticker_symbol varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Votes(
    stock_id SERIAL NOT NULL,
    date date NOT NULL,
    voter varchar(255),
    FOREIGN KEY(stock_id) references Stocks(id)
);

CREATE TABLE Comments(
    stock_id SERIAL NOT NULL,
    date date NOT NULL,
    comment varchar(1024),
    commenter varchar(255) NOT NULL,
    FOREIGN KEY(stock_id) references Stocks(id)
);