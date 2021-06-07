# Project Description

## Introduction

AQI monitoring is Single Page Web displays live AQI (Air Quality Index) of different cities in India.

## Features

### Legends

On the  top of page, Air Quality Index Map provides color pallete which maps aqi to corresponding color code. 

This color codes are being used as backround color of accordion card.

### Accordion Card

Accordion card shows city wise AQI data.

Each card displays `city name`, `aqi` and `last updated` field. It also contains chevron icon on left to open that card.

When card is opened it shows line graph of that particular `city aqi` vs `time`.

We can open multiple cards in order to compare graphs of multiple cities. This graph also updates and scales with live data.

### Toast Message

Toast message comes on the center bottom part when there is any updates coming from Web Socket connection. 

### Web Socket Handling

Custom react hook created to handle Web socket connection. Different scenarios handled in `useWebSocket` hook. 

### Last updated polling **Performance***

On accordion card last updated data showed. Polling logic is mentioned below which efficiently polls all cards to update timestamp on it. 

Every `5 seconds` if data is **not older than a min**.
Every `1 min` if data is **not older than an hour**.
Every `1 hour` if data is **not older than a day**.
Every `1 day` if data is **older than a day**.

## Steps to run on local machine

### `git pull`

Checkout latest code from master branch to local machine.

### `yarn / npm install`

Go to that project directory in cli.

Install required package by running **yarn / npm install** command. 

### `yarn start / npm run start`

Once all packages are installed. Run the app in the development mode by running **yarn start / npm run start** command.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Other Library used

`d3-js` - To draw line chart.