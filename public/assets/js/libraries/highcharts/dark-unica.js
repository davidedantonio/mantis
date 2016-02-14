Highcharts.theme = {
	colors: [ '#94B52E', '#9b59b6', '#f39c12', '#c0392b', '#27ae60','#e67e22', '#C93756' ],
	chart: {
    backgroundColor: "transparent",
		style: {
			fontFamily: "Helvetica,Arial,sans-serif, sans-serif"
		},
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false
	},
	title: {
		style: {
			color: '#838d9d',
			textTransform: 'uppercase',
			fontSize: '20px'
		}
	},
	subtitle: {
		style: {
			color: '#838d9d',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#838d9d',
		labels: {
			style: {
				color: '#838d9d'
			}
		},
		lineColor: '#838d9d',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#A0A0A3'

			}
		}
	},
	yAxis: {
		gridLineColor: '#838d9d',
		labels: {
			style: {
				color: '#838d9d'
			}
		},
		lineColor: '#838d9d',
		minorGridLineColor: '#838d9d',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#A0A0A3'
			}
		}
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		style: {
			color: '#fff'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#B0B0B3'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#505053'
		},
		candlestick: {
			lineColor: '333'
		},
		errorbar: {
			color: 'white'
		},
    pie: {
      borderWidth: 0,
      size: "100%"
    },
    bar: {
      borderWidth: 0
    },
    column: {
      borderWidth: 0
    }
	},
	legend: {
		itemStyle: {
			color: '#E0E0E3'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#606063'
		}
	},
	labels: {
		style: {
			color: '#707073'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#F0F0F3'
		},
		activeDataLabelStyle: {
			color: '#F0F0F3'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			theme: {
				fill: '#505053'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#505053',
			stroke: '#000000',
			style: {
				color: '#CCC'
			},
			states: {
				hover: {
					fill: '#707073',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				}
			}
		},
		inputBoxBorderColor: '#505053',
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(255,255,255,0.1)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		},
		xAxis: {
			gridLineColor: '#505053'
		}
	},

	scrollbar: {
		barBackgroundColor: '#808083',
		barBorderColor: '#808083',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: '#606063',
		buttonBorderColor: '#606063',
		rifleColor: '#FFF',
		trackBackgroundColor: '#404043',
		trackBorderColor: '#404043'
	},

	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
