module.exports = server_key => {
   if (!server_key) {
       return async (req, res, next) => {
           return next();
       };
   } else return async (req, res, next) => {
       if (!req.body.key) {
           return res.send(
               {
                   error: true,
                   reason: "server_key",
                   message: "missing server key",
               },
           );
       } else if (req.body.key != server_key) {
            return res.send(
                {
                    error: true,
                    reason: "server_key",
                    message: "invalid server key"
                },
            );
       } else {
           return next();
       };
   };
};