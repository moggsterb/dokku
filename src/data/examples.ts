export const LEVELS = [
  { id: 1, marginTop: 0, initX: -400, title: 'Easy', url: '/selector/easy', description: 'Solveable with just BLOCK scanning' },
  { id: 2, marginTop: 0, initX: 400, title: 'Normal', url: '/selector/normal', description: 'Solveable with BLOCK and occasional SINGLE scanning' },
  {
    id: 3, marginTop: 0, initX: -400, title: 'Difficult', url: '/selector/difficult', description: 'Solveable with BLOCK and occasional SINGLE, COLUMN and ROW scanning'
  },
  { id: 4, marginTop: 0, initX: 400, title: 'Expert', url: '/selector/expert', description: 'Solveable using combinations of BLOCK, SINGLE, COLUMN and ROW scanning' },
  { id: 5, marginTop: 0, initX: -400, title: 'Impossible', url: '/selector/impossible', description: 'Not fully solveable yet - will require more advanced solving techniques' },
  { id: 99, marginTop: 20, initX: 400, title: 'Create your own Grid', url: '/builder', description: 'Solve your own Puzzle', style: 'create' }
]


export const EXAMPLES = [

  // LEVEL 0 --------- block only

  {
    id: 1,
    grid: ['----134--', '-8---695-', '65-------', '96-2-1---', '1---7---2', '---3-4-16', '-------79', '-258---4-', '--976----'],
    title: 'Mild 7',
    level: 1,
    unsolvedAtStart: 52,
    unsolvedAtFinish: 0,
    start: 16,
    cycles: 4,
    completes: true,
    method: 'BBBBBBBB',
  },
  {
    id: 2,
    grid: ['-5-8-1-9-', '73-----54', '8---3---1', '--83-21--', '---------', '--67-45--', '1---5---9', '38-----12', '-4-6-8-3-'],
    title: 'Mild 17',
    level: 1,
    unsolvedAtStart: 51,
    unsolvedAtFinish: 0,
    start: 15,
    cycles: 4,
    completes: true,
    method: 'BBBBBBBB'
  },
  {
    id: 3,
    grid: ['--13-97--', '7-------6', '56-----18', '-4-693-7-', '----5----', '-7-482-5-', '63-----81', '2-------9', '--49-13--'],
    title: 'Mild 21',
    level: 1,
    unsolvedAtStart: 50,
    unsolvedAtFinish: 0,
    start: 17,
    cycles: 4,
    completes: true,
    method: 'BBBBBBBB'
  },
  {
    id: 4,
    grid: ['-65---3--', '2---679--', '-4-3----1', '--6-5---4', '---4-2---', '7---8-1--', '6----4-1-', '--857---6', '--1---83-'],
    title: 'Mild 12',
    level: 1,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 11,
    cycles: 6,
    completes: true,
    blockComplete: 'BBBBBBBBBBB',
  },
  {
    id: 5,
    grid: ['47-1-8-29', '---------', '--69271--', '-9-6-1-3-', '3-------4', '-4-7-9-8-', '--48753--', '---------', '58-4-3-97'],
    title: 'Mild 16',
    level: 1,
    unsolvedAtStart: 49,
    unsolvedAtFinish: 0,
    start: 11,
    cycles: 5,
    completes: true,
    method: 'BBBBBBBBB'
  },
  {
    id: 6,
    grid: ['653---7--', '-----9---', '8-4-5---3', '9---173--', '--5-3-8--', '--729---5', '4---7-2-6', '---8-----', '--6---157'],
    title: 'Mild 18',
    level: 1,
    unsolvedAtStart: 52,
    unsolvedAtFinish: 0,
    start: 9,
    cycles: 5,
    completes: false,
    method: 'BBBBBBBBBBBB'
  },
  {
    id: 7,
    grid: ['-24861---', '17--2---5', '---------', '7-1--3-8-', '9---5---4', '-8-9--5-1', '---------', '3---8--17', '---69245-'],
    title: 'Mild 20',
    level: 1,
    unsolvedAtStart: 52,
    unsolvedAtFinish: 0,
    start: 11,
    cycles: 5,
    completes: true,
    method: 'BBBBBBBBBBBBB'
  },
  {
    id: 8,
    grid: ['-279-----', '-5---2-84', '--8---2-7', '-7--3---6', '---817---', '3---4--2-', '1-6---8--', '24-6---1-', '-----564-'],
    title: 'Mild 13',
    level: 1,
    unsolvedAtStart: 52,
    unsolvedAtFinish: 0,
    start: 12,
    cycles: 6,
    completes: true,
    blockComplete: 'BBBBBBBBBB',
  },
  {
    id: 9,
    grid: ['--6--7--9', '8---3-1--', '9--6-5-3-', '--3----18', '---9-1---', '21----6--', '-6-7-3--1', '--9-2---4', '7--8--5--'],
    title: 'Mild 15',
    level: 1,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 6,
    cycles: 9,
    completes: true,
    blockComplete: 'BBBBBBBBBBBBBBBB',
  },








  // LEVEL 1 --------- blocks and singles
  {
    id: 10,
    grid: ['---4-9---', '-8--2-7--', '-2-5-71-6', '3--8---6-', '76-----31', '-1---6--2', '2-59-8-4-', '--9-7--1-', '---6-5---'],
    title: 'Mild 9',
    level: 2,
    unsolvedAtStart: 51,
    unsolvedAtFinish: 0,
    start: 10,
    cycles: 4,
    completes: true,
    blockComplete: 'BBBBBSBBBBB',
  },
  {
    id: 11,
    grid: ['------945', '--6------', '52-1-38-7', '-9-31----', '--3-8-1--', '----46-2-', '7-52-8-19', '------3--', '861------'],
    title: 'Mild 10',
    level: 2,
    unsolvedAtStart: 52,
    unsolvedAtFinish: 0,
    start: 13,
    cycles: 5,
    completes: true,
    blockComplete: 'BBBBBSBBBBBBBB',
  },
  {
    id: 12,
    grid: ['--5-----6', '4--2-9---', '37--6---8', '-4---6--7', '-8--5--2-', '1--3---9-', '5---8--32', '---9-7--1', '6-----7--'],
    title: 'Mild 27',
    level: 2,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 0,
    start: 8,
    cycles: 6,
    completes: true,
    method: 'BBBBBBBSBBBBBBBB'
  },
  {
    id: 13,
    grid: ['-1-----6-', '3-------9', '25-4--3--', '47-31----', '-2--7--4-', '----46-78', '--3--8-57', '8-------4', '-6-----1-'],
    title: 'Mild 19',
    level: 2,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 0,
    start: 13,
    cycles: 7,
    completes: true,
    method: 'BBBBBSBBBBBBBBBB'
  },
  {
    id: 14,
    grid: ['9--2781--', '--1-3-249', '--3------', '-3-8-----', '--7---5--', '-----4-3-', '------3--', '578-4-9--', '--4516--7'],
    title: 'Mild 14',
    level: 2,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 14,
    cycles: 8,
    completes: true,
    blockComplete: 'BBBBBBBSBBBBBBBBB',
  },
  {
    id: 15,
    grid: ['2--7---5-', '----48--6', '-----23-9', '9--6--24-', '-7--2--8-', '-25--1--3', '8-49-----', '6--48----', '-9---3--8'],
    title: 'Mild 11',
    level: 2,
    unsolvedAtStart: 52,
    unsolvedAtFinish: 0,
    start: 10,
    cycles: 8,
    completes: true,
    blockComplete: 'BBBBBBBBSBBBBBBBBB',
  },

  {
    id: 16,
    grid: ['--8-9----', '-7----28-', '-641--3-9', '---8-59--', '5-------1', '--93-4---', '8-2--756-', '-97----1-', '----6-7--'],
    title: 'Difficult 32',
    level: 2,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 7,
    cycles: 8,
    completes: true,
    blockComplete: 'BBBBBSBBBBBBBBBBBBBBBB',
  },
  {
    id: 17,
    grid: ['5-7-----9', '-8---217-', '-1--6---4', '-9--3----', '--17-93--', '----4--6-', '8---5--2-', '-762---9-', '4-----6-8'],
    title: 'Difficult 35',
    level: 2,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 9,
    cycles: 7,
    completes: true,
    blockComplete: 'BBBBSSBBBBBBBBBBBB'
  },
  {
    id: 18,
    grid: ['--1-9-27-', '--9--2-5-', '2----3---', '3---14--2', '-8-----4-', '1--28---5', '---9----7', '-1-3--9--', '-46-7-5--'],
    title: 'Mild 8',
    level: 2,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 7,
    cycles: 8,
    completes: true,
    earliestSolve: 'BBBBBBBSSBBBBBBBB'
  },

  // LEVEL 2 --------- blocks and singles repeated

  {
    id: 19,
    grid: ['3-27----9', '--8----45', '--4--13--', '----59---', '-9--3--6-', '---26----', '--14--2--', '26----1--', '4----25-3'],
    title: 'Difficult 39',
    level: 3,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 0,
    start: 12,
    cycles: 7,
    completes: true,
    method: 'BBBBSBSBBBBBBBBBB'
  },
  {
    id: 20,
    grid: ['---7-2---', '1---4---7', '65-----94', '47-8-1-62', '---------', '58-2-9-13', '86-----75', '9---6---8', '---9-8---'],
    title: 'Difficult 33',
    level: 3,
    unsolvedAtStart: 51,
    unsolvedAtFinish: 0,
    start: 10,
    cycles: 7,
    completes: true,
    blockComplete: 'BBBBBBBBSBBBBSBBBBBBBBBBBBB',
  },
  {
    id: 21,
    grid: ['-95--8---', '--2--67--', '-4------5', '-5--2---7', '-6--5--2-', '4---7--8-', '2------4-', '--61--3--', '---3--25-'],
    title: 'Difficult 40',
    level: 3,
    unsolvedAtStart: 56,
    unsolvedAtFinish: 0,
    start: 8,
    cycles: 12,
    completes: true,
    method: 'BBBBBBSBBBBSSBBBBBBBB'
  },
  {
    id: 22,
    grid: ["---89--2-", "--9--5--7", "-5----3--", "-935--1--", "---1-7---", "--1--684-", "--8----6-", "9--6--4--", "-1--28---"],
    title: 'Fiendish 78',
    level: 3,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 0,
    start: 5,
    cycles: 13,
    completes: true,
    method: 'BBSBBBBSBBBBBBBBBBBBBBBBBB'
  },
  {
    id: 23,
    grid: ['--3---4--', '--72-85--', '8---3---7', '2--7-3--4', '--5---8--', '7--5-1--9', '1---4---2', '--68-97--', '--4---9--'],
    title: 'Difficult 41',
    level: 3,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 6,
    cycles: 7,
    completes: true,
    method: 'BSBSSBBBBBSBBBBBBBBBBBBBBBB'
  },
  {
    id: 24,
    grid: ['2-------7', '--761----', '--9--726-', '--4-6--7-', '-5-4-9-3-', '-2--7-5--', '-867--9--', '----843--', '4-------8'],
    title: 'Difficult 44',
    level: 3,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 7,
    cycles: 9,
    completes: true,
    method: 'BBBSBSSSBBBBBBSBBBBBBBBBB'
  },
  {
    id: 25,
    grid: ['5-1-3---7', '-8-----6-', '-----6--4', '--3961---', '8--5-3--9', '---7286--', '1--3-----', '-2-----3-', '9---7-8-1'],
    title: 'Difficult 49',
    level: 3,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 8,
    cycles: 9,
    completes: true,
    method: 'BBBBSBBBBBBSSBBBBBBB'
  },
  {
    id: 26,
    grid: ['7---1--54', '-9------1', '--58---6-', '4--68----', '1---4---3', '----39--2', '-2---61--', '3------2-', '57--2---8'],
    title: 'Difficult 50',
    level: 3,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 0,
    start: 8,
    cycles: 8,
    completes: true,
    method: 'BBBSSBBSSBBBBBBSBBBSBSBBBSBBBBBB'
  },
  {
    id: 27,
    grid: ['-8-79----', '-----2-9-', '--3--845-', '--8-----1', '-96---37-', '3-----2--', '-325--9--', '-4-8-----', '----64-2-'],
    title: 'Fiendish 79',
    level: 3,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 0,
    start: 4,
    cycles: 14,
    completes: true,
    method: 'BSSSSBBBBBBBBBBBBBBBBBBB'
  },



  // LEVEL 3 --------- blocks, singles, columns and rows

  {
    id: 28,
    grid: ['--7238---', '-6-7---5-', '---4----2', '9-----867', '1-------3', '648-----5', '7----3---', '-2---5-3-', '---1749--'],
    title: 'Difficult 34',
    level: 4,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 11,
    cycles: 7,
    completes: true,
    blockComplete: 'BBBBSBCRBBBBBBBBBBBBB'
  },
  {
    id: 29,
    grid: ['--9----64', '4--------', '1--36--72', '--46----9', '---9-3---', '2----54--', '92--57--8', '--------5', '34----6--'],
    title: 'Difficult 37',
    level: 4,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 0,
    start: 8,
    cycles: 10,
    completes: true,
    method: 'BBBBBBSCRBBBSBBBBBBBBBBB'
  },

  {
    id: 30,
    grid: ['-3---8--5', '--5---8-7', '----4-9--', '---39-4--', '-59-7-21-', '--2-65---', '--7-5----', '5-1---7--', '6--9---2-'],
    title: 'Difficult 38',
    level: 4,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 0,
    start: 12,
    cycles: 9,
    completes: true,
    method: 'BBBBBBBBSCBBBBBBBBBBBBB'
  },
  {
    id: 31,
    grid: ['48-6--13-', '---8----7', '2--9-56--', '1----78--', '---------', '--23----1', '--42-9--5', '9----1---', '-23--6-18'],
    title: 'Difficult 46',
    level: 4,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 8,
    cycles: 9,
    completes: true,
    method: 'BSSSCBBBBBSBBBBBBBBBBBBB'
  },

  {
    id: 32,
    grid: ['18----4--', '---8-----', '--9-345--', '-4-96----', '52--8--76', '----53-1-', '--251-7--', '-----2---', '--7----92'],
    title: 'Difficult 51',
    level: 4,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 0,
    start: 7,
    cycles: 10,
    completes: true,
    method: 'BBBBSSBSSBSRBBBBBBBBBBBBBB'
  },
  {
    id: 33,
    grid: ['93-----76', '5--47---2', '----93---', '--9----6-', '-67---18-', '-2----3--', '---54----', '2---68--3', '14-----25'],
    title: 'Difficult 52',
    level: 4,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 5,
    cycles: 11,
    completes: true,
    method: 'BBBBSBBBSRBBBBBBBBBBBSBBBBBB'
  },
  {
    id: 34,
    grid: ['1-------9', '-6-8-7-5-', '--7---2--', '21--5--93', '---4-8---', '43--2--87', '--1---9--', '-5-6-9-4-', '6-------8'],
    title: 'Fiendish 89',
    level: 4,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 0,
    start: 7,
    cycles: 12,
    completes: true,
    method: 'BBBBRSBBBSBBBBBBSSBBBBBBBB'
  },
  {
    id: 35,
    grid: ['1-------4', '245---7-8', '-3-5-----', '9----31--', '---8-7---', '--76----2', '-----9-4-', '4-2---653', '3-------9'],
    title: 'Fiendish 87',
    level: 4,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 0,
    start: 3,
    cycles: 14,
    completes: true,
    method: 'BBSBBBBBBBBBBCBRBBBBBBBBBB'
  },
  {
    id: 36,
    grid: ['4-------5', '1-3---4--', '-----3-6-', '3--59-2-8', '---8-7---', '8-9-61--7', '-2-4-----', '--1---5-6', '5-------9'],
    title: 'Difficult 54',
    level: 4,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 0,
    start: 7,
    cycles: 11,
    completes: true,
    method: 'BBBBBBBBSSCRBBRBBSBBBBBBBBBBB'
  },





  // LEVEL 3 --------- impossible

  {
    id: 37,
    grid: ['-9-568-2-', '---------', '-56---79-', '3--4-9--7', '---------', '4--2-1--8', '-74---51-', '---------', '-2-134-7-'],
    title: 'Fiendish 86',
    level: 5,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 29,
    start: 5,
    cycles: 8,
    completes: false,
    method: 'BBBBBBBBBSSBBSSBB-'
  },
  {
    id: 38,
    grid: ['--14-----', '----786-1', '----5-9--', '-8-----23', '-13---56-', '95-----7-', '--5-4----', '3-918----', '-----73--'],
    title: 'Fiendish 88',
    level: 5,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 31,
    start: 2,
    cycles: 7,
    completes: false,
    method: 'BSBSBBBBBBBBSSRBB-'
  },
  {
    id: 39,
    grid: ['--97-----', '5----27-9', '8---1---6', '--16--4-5', '----4----', '7-6--82--', '4---9---8', '6-23----4', '-----79--'],
    title: 'Difficult 36',
    level: 5,
    unsolvedAtStart: 54,
    unsolvedAtFinish: 32,
    start: 5,
    cycles: 6,
    completes: false,
    method: 'BBBBBBBBC-'
  },
  {
    id: 40,
    grid: ['-192--5--', '7---8-3--', '-4-5-----', '3--------', '-2-1-7-8-', '--------1', '-----4-5-', '--5-1---6', '--2--679-'],
    title: 'Fiendish 85',
    level: 5,
    unsolvedAtStart: 57,
    unsolvedAtFinish: 39,
    start: 9,
    cycles: 6,
    completes: false,
    method: 'BBBBSBBB-'
  },
  {
    id: 41,
    grid: ['---34----', '2-----4-7', '-7---8--5', '--3--1--2', '--9-6-8--', '7--2--3--', '5--6---1-', '1-2-----9', '----14---'],
    title: 'Fiendish 83',
    level: 5,
    unsolvedAtStart: 56,
    unsolvedAtFinish: 40,
    start: 4,
    cycles: 4,
    completes: false,
    method: 'BBBB-'
  },
  {
    id: 42,
    grid: ['1---34--9', '74-------', '----8-2--', '-9-72-15-', '---------', '-17-93-2-', '--3-5----', '-------96', '6--97---5'],
    title: 'Fiendish 81',
    level: 5,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 42,
    start: 5,
    cycles: 6,
    completes: false,
    method: 'BBBBBB-'
  },
  {
    id: 43,
    grid: ['---------', '5----9-62', '87--5--3-', '1---4-52-', '3--9-6--1', '-84-2---3', '-1--6--47', '74-8----9', '---------'],
    title: 'Difficult 45',
    level: 5,
    unsolvedAtStart: 53,
    unsolvedAtFinish: 43,
    start: 5,
    cycles: 4,
    completes: false,
    method: 'BBBBSS-'
  },
  {
    id: 44,
    grid: ['-8-----2-', '--1---6--', '2---5---3', '--65-12--', '7--6-4--9', '--47-93--', '6---1---5', '--7---9--', '-4-----3-'],
    title: 'Fiendish 84',
    level: 5,
    unsolvedAtStart: 55,
    unsolvedAtFinish: 47,
    start: 2,
    cycles: 4,
    completes: false,
    method: 'BBSBBBBB-'
  },
  {
    id: 45,
    grid: ['---4----2', '--4-12--9', '-7---8---', '-2----17-', '---------', '-61----4-', '---9---5-', '6--12-3--', '1----3---'],
    title: 'Fiendish 80',
    level: 5,
    unsolvedAtStart: 59,
    unsolvedAtFinish: 55,
    start: 3,
    cycles: 2,
    completes: false,
    method: 'BB-'
  },











  // {
  //   id: 999,
  //   grid: ['--14-----', '----786-1', '----5-9--', '-8-----23', '-13---56-', '95-----7-', '--5-4----', '3-918----', '-----73--'],
  //   title: 'Fiendish 88',
  //   level: 9,
  //   unsolvedAtStart: 55,
  //   unsolvedAtFinish: 31,
  //   start: 2,
  //   cycles: 7,
  //   completes: false,
  //   method: 'BSBSBBBBBBBBSSRBB-'
  // },



  // {
  //   id: 999,
  //   grid: ['--86----2', '39---2---', '--437----', '--3---81-', '6-2-1-3-4', '-15---2--', '----637--', '---5---49', '2----81--'],
  //   title: 'Mild 22',
  //   level: 9,
  //   start: 8,
  //   cycles: 7,
  //   completes: true,
  //   method: 'BBBBBBBBBBBBBBB'
  // },

  // {
  //   id: 999,
  //   grid: ['1--9--67-', '---4---13', '-9--2----', '---572-3-', '3-------5', '-2-394---', '----4--2-', '26---5---', '-85--3--9'],
  //   title: 'Mild 23',
  //   level: 9,
  //   start: 13,
  //   cycles: 5,
  //   completes: true,
  //   method: 'BBBBBBBBBBBBB'
  // },

  // {
  //   id: 999,
  //   grid: ['--------4', '-2875--3-', '-31--2---', '65-237---', '----9----', '---681-59', '---9--86-', '-9--2431-', '5--------'],
  //   title: 'Mild 24',
  //   level: 9,
  //   start: 8,
  //   cycles: 6,
  //   completes: true,
  //   method: 'BBBBBBBBBBBB'
  // },

  // {
  //   id: 999,
  //   grid: ['----5----', '-6-4-9-1-', '17-----94', '-86---54-', '4--7-3--8', '-21---67-', '24-----87', '-1-9-4-3-', '----3----'],
  //   title: 'Mild 25',
  //   level: 9,
  //   start: 12,
  //   cycles: 6,
  //   completes: true,
  //   method: 'BBBBBBBBBBBBB'
  // },

  // {
  //   id: 999,
  //   grid: ['6459----3', '7--------', '-3---68-4', '----5--39', '1--3-7--2', '42--9----', '2-48---9-', '--------5', '5----9416'],
  //   title: 'Mild 26',
  //   level: 9,
  //   start: 12,
  //   cycles: 4,
  //   completes: true,
  //   method: 'BBBBBBBBBBBB'
  // },


  // {
  //   id: 999,
  //   grid: ['-----9752', '-9-------', '14-8----9', '--95-2--6', '---3-8---', '7--1-45--', '6----3-25', '-------1-', '5246-----'],
  //   title: 'Difficult 42',
  //   level: 9,
  //   start: 8,
  //   cycles: 11,
  //   completes: true,
  //   method: 'BBBBBSSBBBBBBBBBBBBBBBBBBB'
  // },

  // {
  //   id: 999,
  //   grid: ['12------8', '--6--9-4-', '-----5--6', '-5--7-31-', '---5-4---', '-72-3--6-', '6--7-----', '-4-6--5--', '9------37'],
  //   title: 'Difficult 43',
  //   level: 9,
  //   start: 8,
  //   cycles: 8,
  //   completes: true,
  //   method: 'BBBBBBBBBSSBBBBBBBB'
  // },

  // {
  //   id: 999,
  //   grid: ['6---9-18-', '-3---67--', '7------2-', '5---24---', '---6-3---', '---98---7', '-2------8', '--91---7-', '-87-5---9'],
  //   title: 'Difficult 47',
  //   level: 9,
  //   start: 5,
  //   cycles: 11,
  //   completes: false,
  //   method: 'BBBBBBBSSBBBBBBBBBBBBBBBB'
  // },
  // {
  //   id: 35,
  //   grid: ['-6-----27', '---51----', '7--8----9', '54--7----', '---4-8---', '----3--82', '3----2--1', '----63---', '69-----3-'],
  //   title: 'Fiendish 82',
  //   level: 4,
  //   unsolvedAtStart: 57,
  //   unsolvedAtFinish: 0,
  //   start: 6,
  //   cycles: 14,
  //   completes: true,
  //   method: 'BBBBBBSBBBBBBSBBSBBBBBBBBBBBBBBBBB'
  // },

  // {
  //   id: 34,
  //   grid: ['-6--3----', '-459---28', '--8---73-', '----9--5-', '9--8-6--7', '-8--5----', '-36---9--', '42---938-', '----2--1-'],
  //   title: 'Difficult 53',
  //   level: 4,
  //   unsolvedAtStart: 53,
  //   unsolvedAtFinish: 0,
  //   start: 10,
  //   cycles: 10,
  //   completes: true,
  //   method: 'BBBBBSSBBBBBBSSBSBBBBBBBBBBBB'
  // },

];




