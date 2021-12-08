import namor from 'namor';

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    date: Math.floor(Math.random() * 30)+'-'+Math.floor(Math.random() * 12)+'-2021',
    time: Math.floor(Math.random() * 24) +':'+Math.floor(Math.random() * 60)+':'+Math.floor(Math.random() * 24),
    cnic: Math.floor(Math.random() * 100000)+'-'+Math.floor(Math.random() * 10000000)+'-'+Math.floor(Math.random() * 10),
    branchCode:Math.floor(Math.random() * 10000),
    branchAddress: namor.generate({ words: 1, numbers: 0 }),
    conversationId:Math.floor(Math.random() * 10000),
    conversationFile: namor.generate({ words: 1, numbers: 0 })+'.com',
    fileType:namor.generate({ words: 1, numbers: 0 })+'.mp3',
    fileSize:Math.floor(Math.random() * 10000),
    duration:Math.floor(Math.random() * 100),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'Active'
        : statusChance > 0.33
        ? 'Offline'
        : 'Banned',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}