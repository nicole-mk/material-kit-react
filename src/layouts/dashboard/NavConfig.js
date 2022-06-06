// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: '발주관리',
    path: '/home/purchase-management',
    icon: getIcon('eva:shopping-cart-fill'),
  },
  {
    title: '상품관리',
    path: '/home/product-management',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: '거래처 상품관리',
    path: '/home/client-product-management',
    icon: getIcon('eva:file-add-fill'),
  },
];

export default navConfig;
