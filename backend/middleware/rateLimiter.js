// middleware/rateLimiter.js
let ratelimit;

const initRatelimit = async () => {
  if (!ratelimit) {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");

    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 s"),
    });
  }
  return ratelimit;
};

const rateLimiter = async (req, res, next) => {
  try {
    const limiter = await initRatelimit();
    const { success } = await limiter.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    console.log("Rate Limit error", error);
    next(error);
  }
};

module.exports = rateLimiter;