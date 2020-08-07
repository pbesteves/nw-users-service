import Token from "@/db/models/tokenModel";
import makeToken from "@/components/makeToken";

const createToken = (req, res, next) => {
  req.tokenComponent = (id) => {
    return new Token(makeToken(id));
  };
  next();
};

export default createToken;
