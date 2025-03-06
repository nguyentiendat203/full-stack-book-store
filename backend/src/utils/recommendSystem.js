// Hàm recommendItems và cosineSimilarity
export const recommendItems = (purchases, targetUserId, numNeighbors = 3, numRecommendations = 10) => {
  // Lấy danh sách tất cả người dùng và sản phẩm
  let users = [...new Set(purchases.map((p) => p.user_id))]
  let items = [...new Set(purchases.map((p) => p.item_id))]

  // Nếu người dùng mới, gợi ý sản phẩm phổ biến nhất(các sản phẩm được nhiều ng mua)
  if (!users.includes(targetUserId)) {
    const popularItems = items.sort((a, b) => {
      const aCount = purchases.filter((p) => p.item_id === a).length
      const bCount = purchases.filter((p) => p.item_id === b).length
      return bCount - aCount
    })
    return popularItems.slice(0, numRecommendations)
  }

  // Tạo ma trận người dùng sản phẩm
  let userItemMatrix = {}
  users.forEach((user) => {
    userItemMatrix[user] = {}
    items.forEach((item) => {
      userItemMatrix[user][item] = 0
    })
  })

  purchases.forEach((p) => {
    userItemMatrix[p.user_id][p.item_id] = 1 // 1 nếu người dùng đã mua sản phẩm, 0 nếu ch mua
  })

  // Chuyển ma trận thành mảng
  let userItemArray = users.map((user) => items.map((item) => userItemMatrix[user][item]))

  // Tìm người dùng mục tiêu trong mảng
  let targetUserIndex = users.indexOf(targetUserId)
  if (targetUserIndex === -1) {
    return []
  }

  // Tính toán độ tương đồng cosine
  let similarities = userItemArray.map((_, index) => {
    if (index !== targetUserIndex) {
      return { user: users[index], similarity: cosineSimilarity(userItemArray[targetUserIndex], userItemArray[index]) }
    } else {
      return { user: users[index], similarity: -1 }
    }
  })

  // Sắp xếp theo độ tương đồng
  similarities.sort((a, b) => b.similarity - a.similarity)

  // Lấy những người dùng tương tự
  let nearestNeighbors = similarities.slice(0, numNeighbors)

  // Tổng hợp các sản phẩm gợi ý
  let recommendations = {}
  nearestNeighbors.forEach((neighbor) => {
    let neighborIndex = users.indexOf(neighbor.user)
    userItemArray[neighborIndex].forEach((purchase, index) => {
      if (purchase > 0) {
        let item = items[index]
        if (!recommendations[item]) {
          recommendations[item] = 0
        }
        recommendations[item] += purchase * neighbor.similarity
      }
    })
  })

  // Sắp xếp các sản phẩm theo điểm gợi ý
  let recommendedItems = Object.keys(recommendations).sort((a, b) => recommendations[b] - recommendations[a])

  // Trả về các sản phẩm gợi ý
  return recommendedItems.slice(0, numRecommendations)
}

export const cosineSimilarity = (vecA, vecB) => {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
    return 0
  }
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}
