// import { UserModel } from '@Models/UserModels';
// import { User } from '@Core/Models/User';
// import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

// const opts = {} as { jwtFromRequest: JwtFromRequestFunction; secretKey: string };

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretKey = 'abcxyz';

// export const passport = (): void => {
//   return passport.use(
//     new Strategy(opts, function (jwt_payload, done) {
//       UserModel.findOne({ id: jwt_payload.sub }, (err, user) => {
//         if (err) {
//           return done(err, false);
//         }
//         if (user) {
//           return done(null, user);
//         } else {
//           return done(null, false);
//           // or you could create a new account
//         }
//       });
//     })
//   );
// };
