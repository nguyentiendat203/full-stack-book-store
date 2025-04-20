import redis from '~/config/redisClient.js'

const getOrSetCache = async (cacheKey, callback) => {
  try {
    const cached = await redis.get(cacheKey)

    if (cached) {
      return JSON.parse(cached)
    }
    const data = await callback()

    await redis.set(cacheKey, JSON.stringify(data), {
      EX: 300
    })

    return data
  } catch (error) {
    throw error
  }
}

export default getOrSetCache
