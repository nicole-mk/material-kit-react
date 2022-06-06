import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
// pages
import Login from './pages/Login'; // 로그인
import FindId from './pages/FindId'; // 아이디 찾기
import FindPassword from './pages/FindPassword'; // 비밀번호 찾기
import ChangePassword from './pages/ChangePassword'; // 비밀번호 변경
import NotFound from './pages/Page404'; // 404

import PurchaseManagement from './pages/PurchaseManagement'; // 발주관리
import PurchaseOrder from './pages/PurchaseOrder'; // 발주관리 - 발주서
import ProductManagement from './pages/ProductManagement'; // 상품관리
import ClientProductManagement from './pages/ClientProductManagement';
import ClientProductInput from './pages/ClientProductInput';
import ProductInput from './pages/ProductInput'; // 거래처 상품관리

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      // eslint-disable-next-line no-restricted-globals
      // element: <DashboardLayout props={location.pathname} />,
      element: <DashboardLayout />,
      children: [
        /* 발주 관리 */
        {
          path: 'purchase-management',
          // element: isLoggedIn ? <PurchaseManagement /> : <Navigate to="/login" />,
          element: <PurchaseManagement />,
        },
        {
          // 발주서
          path: 'purchase-order',
          // element: isLoggedIn ? <PurchaseOrder /> : <Navigate to="/login" />,
          element: <PurchaseOrder />,
        },
        // /////////////////////////////////////
        // /* 상품 관리 */
        {
          // 리스트 페이지
          path: 'product-management',
          element: <ProductManagement />,
        },
        {
          // 상품관리 - 입력/수정
          path: 'product-list',
          // element: isLoggedIn ? <ProductInput /> : <Navigate to="/login" />,
          element: <ProductInput />,
        },
        // /////////////////////////////////////
        // /* 거래처 관리 */
        {
          // 등록 리스트
          path: 'client-product-management',
          element: <ClientProductManagement />,
        },
        {
          // 거래처상품관리 - 입력/수정
          path: 'client-product-input',
          // element: isLoggedIn ? <ClientProductInput /> : <Navigate to="/login" />,
          element: <ClientProductInput />,
        },
        // / //////////////////////////////////
        /* 회원정보 */
        {
          // 비밀번호 변경
          path: 'reset-pass',
          element: <ChangePassword />,
        },
        // / //////////////////////////////////
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/home/purchase-management" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'find-id', element: <FindId /> },
        { path: 'find-pass', element: <FindPassword /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
