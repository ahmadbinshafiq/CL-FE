

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
    number: Math.floor(Math.random() * 10),
    date: Math.floor(Math.random() * 30)+'-'+Math.floor(Math.random() * 12)+'-2021',
    branchCode:'0'+Math.floor(Math.random() * 100),
    fileSize:Math.floor(Math.random() * 10000),
    duration:Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'Critical'
        : statusChance > 0.33
        ? 'Medium'
        : 'Low Priority',
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