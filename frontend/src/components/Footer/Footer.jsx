import { faFacebook, faInstagram, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import fahasa from '~/assets/fahasa-logo.webp'
import boCongThuong from '~/assets/image/footer/logo-bo-cong-thuong-da-thong-bao.webp'
import ggPlay from '/ggplay.webp'
import appleStore from '/appstore.webp'
import imagesPTTT from '~/assets/image/footer/imagesPTTT'

function Footer() {
  return (
    <>
      <div className='bg-white container w-10/12 2xl:w-8/12 mx-auto py-6 rounded-lg'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='border-r-2 border-gray-200 pr-4'>
            <img src={fahasa} alt='Fahasa' className='h-12 mb-4' />
            <p className='text-sm text-gray-700'>
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM
              <br />
              Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA
              <br />
              60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
            </p>
            <p className='text-sm text-gray-700 my-2'>
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
            </p>
            <div>
              <img className='w-28' src={boCongThuong} alt='' />
            </div>
            <div className='flex space-x-4 mt-4 text-3xl text-gray-700'>
              <a href=''>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href=''>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href=''>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href=''>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href=''>
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </div>
            <div className='mt-4'>
              <a href='#' className='mr-4'>
                <img src={ggPlay} alt='Google Play' className='h-10 inline-block' />
              </a>
              <a href='#'>
                <img src={appleStore} alt='App Store' className='h-10 inline-block' />
              </a>
            </div>
          </div>
          <div className='col-span-2 flex flex-col'>
            <div className='flex justify-between text-sm'>
              <div className=''>
                <h3 className='text-lg font-semibold mb-2 p-2'>DỊCH VỤ</h3>
                <ul className='text-gray-700'>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Điều khoản sử dụng
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chính sách bảo mật thông tin cá nhân
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chính sách bảo mật thanh toán
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Giới thiệu Fahasa
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Hệ thống trung tâm - nhà sách
                    </a>
                  </li>
                </ul>
              </div>
              <div className=' '>
                <h3 className='text-lg font-semibold mb-2 p-2'>HỖ TRỢ</h3>
                <ul className='text-gray-700'>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chính sách đổi - trả - hoàn tiền
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chính sách bảo hành - bồi hoàn
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chính sách vận chuyển
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chính sách khách sỉ
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Phương thức thanh toán và xuất HĐ
                    </a>
                  </li>
                </ul>
              </div>
              <div className=' '>
                <h3 className='text-lg font-semibold mb-2 p-2'>TÀI KHOẢN CỦA TÔI</h3>
                <ul className='text-gray-700'>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Đăng nhập/Tạo mới tài khoản
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Thay đổi địa chỉ khách hàng
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Chi tiết tài khoản
                    </a>
                  </li>
                  <li className='p-2'>
                    <a href='#' className='hover:text-orange-500'>
                      Lịch sử mua hàng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='mt-6 grid grid-cols-4 gap-4'>
              {imagesPTTT.map((item, index) => {
                return (
                  <>
                    <div key={index}>
                      <img className='w-24 h-12 object-contain' src={item.img} />
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <p className='text-center text-gray-500 text-sm mt-6'>
          Giấy chứng nhận Đăng ký Kinh doanh số 0304132047 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 20/12/2005, đăng ký thay đổi lần thứ 10, ngày 20/05/2022.
        </p>
      </div>
    </>
  )
}

export default Footer
