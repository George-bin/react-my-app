import dev from "./dev.env";
import prod from "./prod.env";

export default {
  env: process.env.NODE_ENV !== "production" ? dev : prod
};
