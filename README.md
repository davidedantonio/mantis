# Mantis

Mantis is a free realtime data dashboards for businesses build with [Node.js](https://nodejs.org), [MongoDB](https://www.mongodb.org/),
[ExpressJS](http://expressjs.com/), [AngularJS](https://angularjs.org/), [Bootstrap](http://getbootstrap.com/).

The idea of building mantis came out of the need to monitor all business data from one place.
Currently Mantis is compatible with [Google Chrome](https://www.google.it/chrome/browser/desktop/), [Firefox](https://www.mozilla.org/it/firefox/new/) and [Safari](https://www.apple.com/it/safari/).

## Features

- It's free
- Easy to configure your dashboards and widget
- Resize and move your widgets on dashboard.
- Realtime notification via Web Sockets

## Start with Mantis

- [Before you start](#before-you-start)
- [Quick Start](#quick-start)
- [Highcharts](#highcharts)
- [Currently Fixing](#currently-fixing)

### Before you start

Before you start to use Mantis you need to install:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.org/)

### Quick start

Several quick start options are available:

- [Download the latest release](https://github.com/davidedantonio/mantis/archive/master.zip).
- Clone the repo: `git clone https://github.com/davidedantonio/mantis.git`.
- Run `npm install`
- After installation run `node server.js`
- Enjoy your dashboards and widgets

### Highcharts

Mantis integrate [Highcharts](http://www.highcharts.com/) used by tens of thousands of developers and 61 out of the world's 100 largest companies, Highcharts is the simplest yet most flexible charting API on the market.

Json sample data that a widget expect
```json
{
  "options": {
    "chart": {
      "type": "area"
    }
  },
  "yAxis": {
    "title": {
      "text": "Number of queries"
    }
  },
  "xAxis": {
    "categories": [
      "17:47",
      "17:48",
      "17:49",
      "17:50",
      "17:51",
      "17:55",
      "17:57",
      "18:00",
      "18:04",
      "18:11",
      "18:17",
      "18:18",
      "18:19",
      "18:20",
      "18:21",
      "18:22",
      "18:24",
      "18:30",
      "18:31",
      "18:38",
      "18:44",
      "18:45",
      "18:46",
      "18:47"
    ],
    "labels": {
      "rotation": -45
    }
  },
  "series": [
    {
      "name": "Queries",
      "color": "#94B52E",
      "data": [
        564,
        407,
        444,
        142,
        303,
        19,
        257,
        6,
        257,
        257,
        257,
        159,
        203,
        209,
        262,
        129,
        331,
        6,
        275,
        279,
        177,
        362,
        545,
        397
      ]
    },
    {
      "name": "Slow Queries",
      "color": "#9b59b6",
      "data": [
        464,
        320,
        143,
        58,
        9,
        0,
        0,
        0,
        0,
        100,
        391,
        390,
        305,
        218,
        142,
        59,
        20,
        0,
        0,
        0,
        469,
        451,
        278,
        177
      ]
    }
  ]
}
```

### Current Implementation

- Reponsiveness
- Email integration

### Future Implementation

- Exporting data in csv or excel format
- Slack integration
- Monit integration
- Zendesk integration
- Google analytics integration
- Facebook integration
- Twitter integration
- Multiple themes

## Screenshot
![image](https://raw.githubusercontent.com/davidedantonio/mantis/master/schreenshots/mantis-logo.jpg)
![image](https://raw.githubusercontent.com/davidedantonio/mantis/master/schreenshots/screen1.png)
![image](https://raw.githubusercontent.com/davidedantonio/mantis/master/schreenshots/screen2.png)
![image](https://raw.githubusercontent.com/davidedantonio/mantis/master/schreenshots/screen3.png)


## Creator
**Davide D'Antonio**

- <https://twitter.com/davidedantonio>
- <https://github.com/davidedantonio>
- <https://www.facebook.com/davide.dantonio84>
- <https://it.linkedin.com/in/davidedantonio>
