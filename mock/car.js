const carData = {
  'drive': [
    { id: '1', vehCode: '12345', speedTime: 3, speedMake: 76, oilEat: 11.4, maxSpeed: 48, avSpeed: 38 },
    { id: '2', vehCode: '12346', speedTime: 5, speedMake: 87, oilEat: 11.1, maxSpeed: 46, avSpeed: 36 },
    { id: '3', vehCode: '12347', speedTime: 4, speedMake: 55, oilEat: 19.5, maxSpeed: 47, avSpeed: 37 },
    { id: '4', vehCode: '12348', speedTime: 2, speedMake: 56, oilEat: 20.1, maxSpeed: 44, avSpeed: 35 }
  ],
  'speed': [{ id: '1', vehCode: '12345', speedTime: 0.3, speedMake: 6, speedNum: 3, maxSpeed: 48, minSpeed: 38, speedLimit: 45 },
    { id: '2', vehCode: '12346', speedTime: 0.1, speedMake: 8, speedNum: 2, maxSpeed: 46, minSpeed: 36, speedLimit: 45 },
    { id: '3', vehCode: '12347', speedTime: 0.2, speedMake: 5, speedNum: 1, maxSpeed: 47, minSpeed: 37, speedLimit: 45 },
    { id: '4', vehCode: '12348', speedTime: 0.2, speedMake: 6, speedNum: 0, maxSpeed: 44, minSpeed: 35, speedLimit: 45 }
  ],
  'seat': [{ id: '1', vehCode: '12345', time: '2019-10-01 10:56:12', lng: 116.337078, lat: 39.938673, speed: 42, direction: '下行', effect: '有效', state: '正常', seat: '线路一' },
    { id: '2', vehCode: '12346', time: '2019-10-01 10:56:27', lng: 116.352158, lat: 39.943585, speed: 40, direction: '下行', effect: '有效', state: '正常', seat: '线路二' }
  ],
  'stop': [{ id: '1', vehCode: '12345', stopTime: '1.3', stopCount: 3 },
    { id: '2', vehCode: '12346', stopTime: '1', stopCount: 2 },
    { id: '3', vehCode: '12347', stopTime: '0.6', stopCount: 1 },
    { id: '4', vehCode: '12348', stopTime: '1', stopCount: 2 }
  ],
  'dis': [{ id: '1', vehCode: '12345', dis: '83', oilEat: 13 },
    { id: '2', vehCode: '12346', dis: '72', oilEat: 12 },
    { id: '3', vehCode: '12347', dis: '65', oilEat: 18.5 },
    { id: '4', vehCode: '12348', dis: '80', oilEat: 19.8 }
  ],
  'order': [{ id: '1', vehCode: '12345', sendTime: '2019-10-01 10:23:52', sendOrder: '停车', sendContent: '开始线路一', monitorName: '李四', sendResult: '发送成功' },
    { id: '2', vehCode: '12346', sendTime: '2019-10-01 10:56:12', sendOrder: '熄火', sendContent: '开始线路二', monitorName: '李四', sendResult: '发送失败' },
    { id: '3', vehCode: '12346', sendTime: '2019-10-01 10:57:18', sendOrder: '熄火', sendContent: '开始线路二', monitorName: '李四', sendResult: '发送成功' }
  ],
  'passes': [{ id: '1', vehCode: '12345', disTime: '3', passes: 4 },
    { id: '2', vehCode: '12346', disTime: '4', passes: 6 },
    { id: '3', vehCode: '12347', disTime: '3', passes: 4 },
    { id: '4', vehCode: '12348', disTime: '5', passes: 7 }
  ],
  'well': [{ id: '1', vehCode: '12345', wellId: '1', SIMId: '13564851217', speed: '42', effect: '有效', totalMake: '682', power: '80%', lastTime: getYesterday() + ' 16:20:32', state: '停车电量80%，信号强超时' },
    { id: '2', vehCode: '12346', wellId: '2', SIMId: '13564823412', speed: '45', effect: '有效', totalMake: '582', power: '40%', lastTime: getYesterday() + ' 17:12:12', state: '电量40%，信号强' },
    { id: '3', vehCode: '12347', wellId: '3', SIMId: '13564826410', speed: '43', effect: '有效', totalMake: '482', power: '10%', lastTime: getYesterday() + ' 16:20:32', state: '电量10%，信号强' },
    { id: '4', vehCode: '12348', wellId: '4', SIMId: '13564833811', speed: '41', effect: '有效', totalMake: '663', power: '30%', lastTime: getYesterday() + ' 17:10:32', state: '电量30%，信号弱' }
  ],
  'oil': [{ id: '1', vehCode: '12345', oilNum: '160', oilCount: 2 },
    { id: '2', vehCode: '12346', oilNum: '210', oilCount: 3 },
    { id: '3', vehCode: '12347', oilNum: '200', oilCount: 1 },
    { id: '4', vehCode: '12348', oilNum: '210', oilCount: 1 }
  ],
  'oilly': [{ id: '1', vehCode: '12345', oilNum: '0', oilCount: 0 },
    { id: '2', vehCode: '12346', oilNum: '5', oilCount: 1 },
    { id: '3', vehCode: '12347', oilNum: '0', oilCount: 0 },
    { id: '4', vehCode: '12348', oilNum: '0', oilCount: 0 }
  ],
  'cycle': [{ id: '1', vehCode: '12345', totalDis: '518', totalOilEat: '103', speedNum: '5', outtimeStopcarNum: '2', oilNum: '650', oilleakNum: '0', oilEat: '15.1' },
    { id: '1', vehCode: '12346', totalDis: '565', totalOilEat: '115', speedNum: '4', outtimeStopcarNum: '3', oilNum: '620', oilleakNum: '5', oilEat: '14.2' },
    { id: '1', vehCode: '12347', totalDis: '480', totalOilEat: '112', speedNum: '6', outtimeStopcarNum: '3', oilNum: '550', oilleakNum: '0', oilEat: '19.8' },
    { id: '1', vehCode: '12348', totalDis: '556', totalOilEat: '128', speedNum: '8', outtimeStopcarNum: '4', oilNum: '600', oilleakNum: '0', oilEat: '18.6' }
  ],
  'boats': {
    'boatInfoList': {
      'content': [{
        'id': 2,
        'routeNo': '2',
        'vehCode': '12345',
        'direction': '双向',
        'driverName': '王小山',
        'driverContact': '13538163500',
        'busHour': '10:00-16:00',
        'createDate': null,
        'updateDate': null,
        'ifees': 1
      }, {
        'id': 3,
        'routeNo': '3',
        'vehCode': '12346',
        'direction': '双向',
        'driverName': '贺亮',
        'driverContact': '13872995775',
        'busHour': '10:00-16:00',
        'createDate': null,
        'updateDate': null,
        'ifees': 0
      }, {
        'id': 8,
        'routeNo': '1',
        'vehCode': '12347',
        'direction': '双向',
        'driverName': '宁晓博',
        'driverContact': '15850596664',
        'busHour': '10:00-16:00',
        'createDate': null,
        'updateDate': null,
        'ifees': 1
      }, {
        'id': 9,
        'routeNo': '2',
        'vehCode': '12348',
        'direction': '双向',
        'driverName': '史俊',
        'driverContact': '15780596669',
        'busHour': '10:00-16:00',
        'createDate': null,
        'updateDate': null,
        'ifees': 1
      }],
      'pageable': {
        'sort': {
          'sorted': false,
          'unsorted': true,
          'empty': true
        },
        'offset': 0,
        'pageNumber': 0,
        'pageSize': 20,
        'unpaged': false,
        'paged': true
      },
      'totalPages': 1,
      'last': true,
      'totalElements': 11,
      'number': 0,
      'size': 20,
      'sort': {
        'sorted': false,
        'unsorted': true,
        'empty': true
      },
      'numberOfElements': 11,
      'first': true,
      'empty': false
    },
    'routeInfoList': [{
      'routeNo': 1,
      'routeName': '路线一',
      'upRouteDec': '南停车场 -黑熊停留区-狼停留区-白狮停留区-北停车场   ',
      'downRouteDec': '北停车场 -白狮停留区-狼停留区-黑熊停留区-南停车场 ',
      'time': '2019-08-27 13:19:11',
      'upWaitNumber': 12,
      'downWaitNumber': 15,
      'createDate': null,
      'updateDate': null
    }, {
      'routeNo': 2,
      'routeName': '路线二',
      'upRouteDec': '南停车场 -黑熊停留区-白狮停留区-北停车场 ',
      'downRouteDec': '北停车场 -白狮停留区-黑熊停留区-南停车场',
      'time': '2019-08-27 13:25:42',
      'upWaitNumber': 30,
      'downWaitNumber': 20,
      'createDate': null,
      'updateDate': null
    }, {
      'routeNo': 3,
      'routeName': '路线三',
      'upRouteDec': '南停车场 -狼停留区-白狮停留区-北停车场',
      'downRouteDec': '北停车场 -白狮停留区-狼停留区-南停车场',
      'time': '2019-08-21 13:28:12',
      'upWaitNumber': 15,
      'downWaitNumber': 15,
      'createDate': null,
      'updateDate': null
    }]
  }
}

function getYesterday() {
  var now = new Date()
  now.setTime(now.getTime() - 24 * 60 * 60 * 1000)
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10)
}

export default [
  {
    url: '/boatsInfo/cardList',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: [{ id: 1, veh_code: '12345' },
          { id: 2, veh_code: '12346' },
          { id: 3, veh_code: '12347' },
          { id: 4, veh_code: '12348' }
        ]
      }
    }
  },
  {
    url: '/boatsInfo/boats',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: carData['boats']
      }
    }
  },
  {
    url: '/dataStatistics/findGoData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['drive'], allCount: 4, list: { content: carData['drive'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findSpeedData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['speed'], allCount: 4, list: { content: carData['speed'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findSeatData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: [], allCount: 2, list: { content: carData['seat'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findStopCarData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['stop'], allCount: 4, list: { content: carData['stop'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findDisData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['dis'], allCount: 4, list: { content: carData['dis'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findOrderData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: [], allCount: 3, list: { content: carData['order'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findPassesData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['passes'], allCount: 4, list: { content: carData['passes'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findWellData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: [], allCount: 4, list: { content: carData['well'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findOilData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['oil'], allCount: 4, list: { content: carData['oil'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findOillyData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['oilly'], allCount: 4, list: { content: carData['oilly'] }}
      }
    }
  },
  {
    url: '/dataStatistics/findCycleData',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { picList: carData['cycle'], allCount: 4, list: { content: carData['cycle'] }}
      }
    }
  },
  {
    url: '/dataStatistics/loadHistory',
    type: 'post',
    response: config => {
      // mock error
      return {
        code: 200,
        data: { list: [] }
      }
    }
  }
]
