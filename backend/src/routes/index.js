import express from 'express'
import { userRoute } from './userRoute'
import { bookRoute } from './bookRoute'
import { groupRoute } from './groupRoute'
import { roleRoute } from './roleRoute'
import { categoryRoute } from './categoryRoute'
import { supplierRoute } from './supplierRoute'
import { reviewRoute } from './reviewRoute'
import { cartRoute } from '~/routes/cartRoute'
import { orderRoute } from '~/routes/orderRoute'

const router = express.Router()

router.use('/user', userRoute)
router.use('/book', bookRoute)
router.use('/category', categoryRoute)
router.use('/supplier', supplierRoute)
router.use('/cart', cartRoute)
router.use('/order', orderRoute)
router.use('/group', groupRoute)
router.use('/role', roleRoute)
router.use('/review', reviewRoute)

export const APIs = router
