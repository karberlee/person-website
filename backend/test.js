const userDataList = [
  { id: 0 , username: "admin", password: "password" },
  { id: 1 , username: "Karber", password: "123456" },
  { id: 2 , username: "Rex", password: "888888" },
  { id: 3 , username: "Kiwi", password: "666666" },
  { id: 4 , username: "aaa", password: "111" },
  { id: 5 , username: "aaa", password: "111" },
]

let userInfo = userDataList.find(item => item.username == "aaa" && item.password == "111")

console.log("userInfo:", userInfo)