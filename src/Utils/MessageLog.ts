import { ErrorCastError } from '@Controllers/ErrorController';

const errorSignUp = "Can't SignUp User";
const errorCreateUser = "Can't Create User";
const errorFetchUsers = "Can't fetch data user or delete the previous. Please try again later!";
const errorDeleteUser = "Can't delete user. Please try again later!";
const errorUpdateProfile = "Can't update profile";
const errorUpdateUser = "Can't update user";

const errorCreateMenu = "Can't Create Menu";
const errorDeleteMenu = "Can't delete menu. Please try again later!";
const errorUpdateMenuById = "Can't update menu by id. Please try again later!";
const errorFetchMenu = "Can't fetch data menu or delete the previous. Please try again later!";

const errorCreateMenuDetail = "Can't Create Menu Detail";
const errorDeleteMenuDetail = "Can't delete menu detail. Please try again later!";
const errorUpdateMenuDetailById = "Can't update menu detail by id. Please try again later!";
const errorFetchMenuDetail = "Can't fetch data menu detail or delete the previous. Please try again later!";

const errorCreateSubMenu = "Can't Create SubMenu";
const errorDeleteSubMenu = "Can't delete submenu. Please try again later!";
const errorUpdateSubMenuById = "Can't update submenu by id. Please try again later!";
const errorFetchSubMenu = "Can't fetch data submenu or delete the previous. Please try again later!";

const errorCreateMenuPromo = "Can't Create Menu Promo";
const errorDeleteMenuPromo = "Can't delete menu promo. Please try again later!";
const errorUpdateMenuPromoById = "Can't update menu promo by id. Please try again later!";
const errorFetchMenuPromo = "Can't fetch data menu promo or delete the previous. Please try again later!";

const errorCreateRestaurant = "Can't Create Restaurant";
const errorDeleteRestaurant = "Can't delete Restaurant. Please try again later!";
const errorUpdateRestaurantById = "Can't update Restaurant by id. Please try again later!";
const errorFetchRestaurant = "Can't fetch data Restaurant or delete the previous. Please try again later!";

const errorCreateCategory = "Can't Create Category";
const errorDeleteCategory = "Can't delete Category. Please try again later!";
const errorUpdateCategoryById = "Can't update Category by id. Please try again later!";
const errorFetchCategory = "Can't fetch data Category or delete the previous. Please try again later!";

const errorCreateState = "Can't Create State";
const errorDeleteState = "Can't delete State. Please try again later!";
const errorUpdateStateById = "Can't update State by id. Please try again later!";
const errorFetchState = "Can't fetch data State or delete the previous. Please try again later!";

const errorCreateReview = "Can't Create Review";
const errorDeleteReview = "Can't delete Review. Please try again later!";
const errorUpdateReviewById = "Can't update Review by id. Please try again later!";
const errorFetchReview = "Can't fetch data Review or delete the previous. Please try again later!";

const errorCreateOrder = "Can't Create Order";
const errorDeleteOrder = "Can't delete order. Please try again later!";
const errorUpdateOrderById = "Can't update order by id. Please try again later!";
const errorFetchOrder = "Can't fetch data order or delete the previous. Please try again later!";

const errorCreateOrderDetail = "Can't Create Order Detail";
const errorDeleteOrderDetail = "Can't delete order Detail. Please try again later!";
const errorUpdateOrderDetailById = "Can't update order Detail by id. Please try again later!";
const errorFetchOrderDetail = "Can't fetch data order Detail or delete the previous. Please try again later!";

const errorCreateCity = "Can't Create City";
const errorDeleteCity = "Can't delete City. Please try again later!";
const errorUpdateCityById = "Can't update City by id. Please try again later!";
const errorFetchCity = "Can't fetch data City or delete the previous. Please try again later!";

const errorCreatePromo = "Can't Create Promo";
const errorDeletePromo = "Can't delete Promo. Please try again later!";
const errorUpdatePromoById = "Can't update Promo by id. Please try again later!";
const errorFetchPromo = "Can't fetch data Promo or delete the previous. Please try again later!";

const errorCreateStatus = "Can't Create Status";
const errorDeleteStatus = "Can't delete Status. Please try again later!";
const errorUpdateStatusById = "Can't update Status by id. Please try again later!";
const errorFetchStatus = "Can't fetch data Status or delete the previous. Please try again later!";

const errorProvideEmailOrPassword = 'Please provide email and password!';
const errorIncorrectPassword = 'Incorrect email or password';
const errorSomeThingWrong = 'Something went very wrong!';
const errorNotHavePermission = 'You do not have permission to perform this action';
const errorNoUserWithUserName = 'There is no user with email address';
const errorSendingEmail = 'There was error sending the email. Try again later!';
const errorWrongRouteUpdate = 'This route is not for password updates. Please use /updatepassword';

const errorNotHaveToken = 'You are not logged in! Please log in to get access';
const errorTokenExpired = 'Your token has expired! PLease login agian!';
const errorInvalidToken = 'Invalid token. Please log in again!';
const errorTokenNoLongerExist = 'The user belonging to this token does no longer exist';
const errorTokenInvalidOrHasExpired = ' Token is invalid or has expired';
const errorTokenChangedPassword = 'User recently changed password! Please log in again.';
const errorRequestManyTime = 'Too many requests from this IP,  please try again in an hour';

const errorInvalidImage = 'Invalid image. Please add right format!';
const errorNotRightImage = 'Not an image! Please upload only images';

const errorDuplicate = (value: RegExpMatchArray) =>
  `Duplicate field value: ${value}. The User has been signup. PLease try use another phone or email`;
const errorCastMongoose = (err: ErrorCastError) => `Invalid ${err.path}: ${err.value}`;
const errorValidation = (errors: string[]) => `Invalid input data. ${errors.join('. ')} `;

const messageSubjectEmailResetPassword = 'Your password reset token valid for 10 min';
const messageTokenSentToEmail = 'Token sent to email!';

const messageForgotPassword = (resetUrl: string) =>
  `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\n If you didn't forget your password, please ignore this email!`;

export const MessageLog = {
  errorSignUp,
  errorProvideEmailOrPassword,
  errorIncorrectPassword,
  errorNotHaveToken,
  errorCreateUser,
  errorSomeThingWrong,
  errorInvalidToken,
  errorTokenExpired,
  errorTokenNoLongerExist,
  errorTokenChangedPassword,
  errorNotHavePermission,
  errorNoUserWithUserName,
  errorSendingEmail,
  errorTokenInvalidOrHasExpired,
  messageSubjectEmailResetPassword,
  messageTokenSentToEmail,
  errorFetchUsers,
  errorWrongRouteUpdate,
  errorFetchMenu,
  errorDeleteUser,
  errorDeleteMenu,
  errorInvalidImage,
  errorCreateMenu,
  errorUpdateMenuById,
  errorCreateRestaurant,
  errorDeleteRestaurant,
  errorUpdateRestaurantById,
  errorFetchRestaurant,
  errorCreateCategory,
  errorDeleteCategory,
  errorUpdateCategoryById,
  errorFetchCategory,
  errorCreateState,
  errorDeleteState,
  errorUpdateStateById,
  errorFetchState,
  errorCreateCity,
  errorDeleteCity,
  errorUpdateCityById,
  errorFetchCity,
  errorCreatePromo,
  errorDeletePromo,
  errorUpdatePromoById,
  errorFetchPromo,
  errorCreateStatus,
  errorDeleteStatus,
  errorUpdateStatusById,
  errorFetchStatus,
  errorRequestManyTime,
  errorUpdateProfile,
  errorUpdateUser,
  errorNotRightImage,
  errorCreateSubMenu,
  errorDeleteSubMenu,
  errorUpdateSubMenuById,
  errorFetchSubMenu,
  errorCreateReview,
  errorDeleteReview,
  errorUpdateReviewById,
  errorFetchReview,
  errorCreateOrder,
  errorDeleteOrder,
  errorUpdateOrderById,
  errorFetchOrder,
  errorCreateOrderDetail,
  errorDeleteOrderDetail,
  errorUpdateOrderDetailById,
  errorFetchOrderDetail,
  errorCreateMenuDetail,
  errorDeleteMenuDetail,
  errorUpdateMenuDetailById,
  errorFetchMenuDetail,
  errorCreateMenuPromo,
  errorDeleteMenuPromo,
  errorUpdateMenuPromoById,
  errorFetchMenuPromo,
  errorDuplicate,
  errorCastMongoose,
  errorValidation,
  messageForgotPassword
};
