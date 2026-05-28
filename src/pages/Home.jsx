import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HeroBg from "../assets/hero.png";
import SocialImg from "../assets/social.png";

import {
  HiBolt,
  HiCheck,
  HiStar,
  HiShieldCheck,
  HiRocketLaunch,
  HiCurrencyDollar,
  HiChartBar,
} from "react-icons/hi2";

import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTelegram,
  FaTwitter,
  FaFacebook,
  FaSpotify,
  FaDiscord,
  FaCcVisa,
  FaCcPaypal,
  FaCcMastercard,
  FaBitcoin,
} from "react-icons/fa6";

const platforms = [
  { icon: FaInstagram, name: "Instagram", color: "text-pink-500" },
  { icon: FaTiktok, name: "TikTok", color: "text-black dark:text-white" },
  { icon: FaYoutube, name: "YouTube", color: "text-red-500" },
  { icon: FaTelegram, name: "Telegram", color: "text-sky-500" },
  { icon: FaTwitter, name: "Twitter/X", color: "text-black dark:text-white" },
  { icon: FaFacebook, name: "Facebook", color: "text-blue-500" },
  { icon: FaSpotify, name: "Spotify", color: "text-green-500" },
  { icon: FaDiscord, name: "Discord", color: "text-indigo-500" },
];

const duplicatedPlatforms = [
  ...platforms,
  ...platforms,
  ...platforms,
];

const testimonials = [
  {
    name: "Ahmed",
    role: "Content Creator",
    text: "أفضل منصة استخدمتها فعلًا، السرعة رهيبة.",
  },
  {
    name: "Sara",
    role: "Agency Owner",
    text: "واجهة احترافية جدًا والدعم سريع.",
  },
  {
    name: "Mazen",
    role: "Freelancer",
    text: "كل شيء مرتب وسهل وبدون تعقيد.",
  },
];

const duplicatedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

const faq = [
  {
    q: "هل الطلبات تبدأ فورًا؟",
    a: "نعم، أغلب الخدمات تبدأ خلال ثوانٍ قليلة.",
  },
  {
    q: "هل الموقع آمن؟",
    a: "كل العمليات والبيانات محمية بالكامل.",
  },
  {
    q: "هل يوجد API؟",
    a: "نعم، نوفر API احترافي للمطورين.",
  },
  {
    q: "هل يوجد دعم فني؟",
    a: "الدعم متوفر 24/7 طوال الأسبوع.",
  },
];

const services = [
  {
    title: "زيادة المتابعين",
    desc: "متابعين حقيقيين بسرعة فائقة.",
    icon: HiRocketLaunch,
  },
  {
    title: "زيادة اللايكات",
    desc: "رفع التفاعل بشكل احترافي.",
    icon: HiStar,
  },
  {
    title: "المشاهدات",
    desc: "زيادة مشاهدات الفيديوهات والمنشورات.",
    icon: HiChartBar,
  },
  {
    title: "خدمات تلقائية",
    desc: "تنفيذ مستمر بدون تدخل يدوي.",
    icon: HiBolt,
  },
];

export default function Home() {
  return (
    <div
      className="
        bg-white
        dark:bg-[#060816]
        text-[#0f172a]
        dark:text-white
        overflow-hidden
        transition-colors
        duration-300
      "
    >

      {/* HERO */}
      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          justify-center
          overflow-hidden
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        {/* BG */}
        <div className="absolute inset-0">

          <img
            src={HeroBg}
            alt=""
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
              opacity-[0.13]
              dark:opacity-[0.18]
              scale-110
            "
          />

          <div className="absolute inset-0 bg-white/80 dark:bg-[#060816]/75" />

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%)]
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            py-24
            text-center
          "
        >

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-primary/10
                border
                border-primary/20
                text-primary
                text-xs
                px-4
                py-2
                rounded-full
                mb-8
              "
            >
              <HiBolt size={14} />
              FASTEST SMM PANEL
            </div>

            <h1
              className="
                text-5xl
                sm:text-6xl
                lg:text-8xl
                font-black
                leading-[1.05]
                mb-8
              "
            >
              نمو حقيقي
              <span className="block text-primary">
                للسوشيال ميديا
              </span>
            </h1>

            <p
              className="
                text-lg
                sm:text-xl
                leading-relaxed
                text-slate-600
                dark:text-slate-300
                max-w-3xl
                mx-auto
                mb-12
              "
            >
              منصة احترافية لتسويق السوشيال ميديا بسرعة فائقة،
              واجهة حديثة، تنفيذ فوري، وأسعار تنافسية.
            </p>

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-4
                mb-12
              "
            >

              <Link
                to="/register"
                className="
                  bg-primary
                  hover:scale-105
                  transition-all
                  px-8
                  py-4
                  rounded-2xl
                  text-sm
                  font-semibold
                  text-white
                  shadow-2xl
                  shadow-primary/20
                "
              >
                ابدأ الآن
              </Link>

              <Link
                to="/services"
                className="
                  border
                  border-black/10
                  dark:border-white/10
                  hover:border-primary/40
                  hover:bg-black/[0.03]
                  dark:hover:bg-white/[0.03]
                  transition-all
                  px-8
                  py-4
                  rounded-2xl
                  text-sm
                  font-semibold
                "
              >
                تصفح الخدمات
              </Link>
            </div>

            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-6
                text-sm
                text-slate-600
                dark:text-slate-300
              "
            >

              {[
                "تنفيذ فوري",
                "دعم 24/7",
                "أسعار تنافسية",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2"
                >
                  <HiCheck className="text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="
          py-20
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {[
            {
              value: "715465+",
              title: "إجمالي الطلبات",
            },
            {
              value: "1 ثانية",
              title: "يتم تقديم طلب كل",
            },
            {
              value: "$0.001/1k",
              title: "السعر يبدأ من",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                text-center
                rounded-3xl
                p-10
                bg-black/[0.03]
                dark:bg-white/[0.03]
                border
                border-black/5
                dark:border-white/5
              "
            >
              <h2
                className="
                  text-4xl
                  sm:text-5xl
                  font-black
                  text-primary
                  mb-4
                "
              >
                {item.value}
              </h2>

              <p
                className="
                  text-slate-600
                  dark:text-slate-400
                "
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section
        className="
          py-16
          overflow-hidden
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        <div className="text-center mb-10">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-slate-500
            "
          >
            Supported Platforms
          </p>
        </div>

        <div className="relative">

          <div
            className="
              absolute
              left-0
              top-0
              w-40
              h-full
              bg-gradient-to-r
              from-white
              dark:from-[#060816]
              to-transparent
              z-10
            "
          />

          <div
            className="
              absolute
              right-0
              top-0
              w-40
              h-full
              bg-gradient-to-l
              from-white
              dark:from-[#060816]
              to-transparent
              z-10
            "
          />

          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
          >

            {duplicatedPlatforms.map((p, i) => (
              <div
                key={i}
                className="
                  flex
                  items-center
                  gap-3
                  whitespace-nowrap
                  bg-black/[0.03]
                  dark:bg-white/[0.03]
                  border
                  border-black/5
                  dark:border-white/5
                  px-6
                  py-3
                  rounded-2xl
                "
              >
                <p.icon
                  size={18}
                  className={p.color}
                />

                <span
                  className="
                    text-sm
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  {p.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="
          py-28
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <div className="text-center mb-16">

            <span
              className="
                text-primary
                text-sm
                font-semibold
                uppercase
                tracking-widest
              "
            >
              OUR SERVICES
            </span>

            <h2
              className="
                text-4xl
                sm:text-5xl
                font-black
                mt-5
                mb-5
              "
            >
              أهم الخدمات
            </h2>

            <p
              className="
                text-slate-600
                dark:text-slate-400
                max-w-2xl
                mx-auto
              "
            >
              خدمات احترافية مصممة لتساعدك تكبر حساباتك
              بسرعة واحترافية.
            </p>
          </div>

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-6
            "
          >

            {services.map((service, i) => (
              <div
                key={i}
                className="
                  rounded-3xl
                  p-8
                  bg-black/[0.03]
                  dark:bg-white/[0.03]
                  border
                  border-black/5
                  dark:border-white/5
                  hover:border-primary/20
                  transition-all
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-primary/10
                    border
                    border-primary/20
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >
                  <service.icon
                    size={26}
                    className="text-primary"
                  />
                </div>

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-3
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    text-slate-600
                    dark:text-slate-400
                    leading-relaxed
                  "
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="
          py-28
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >

          <div className="flex justify-center">
            <img
              src={SocialImg}
              alt=""
              className="
                w-full
                max-w-[550px]
                rounded-[40px]
                shadow-2xl
                shadow-primary/10
              "
            />
          </div>

          <div>

            <span
              className="
                text-primary
                text-sm
                font-semibold
                tracking-widest
                uppercase
              "
            >
              Powerful Features
            </span>

            <h2
              className="
                text-4xl
                sm:text-5xl
                font-black
                leading-tight
                mt-5
                mb-7
              "
            >
              اكتشف الميزات
              <span className="block text-primary">
                القوية
              </span>
            </h2>

            <p
              className="
                text-lg
                leading-relaxed
                text-slate-600
                dark:text-slate-400
                mb-10
              "
            >
              لوحة تحكم حديثة وسريعة تساعدك تدير طلباتك
              بسهولة واحترافية.
            </p>

            <div className="space-y-4">

              {[
                {
                  icon: HiBolt,
                  title: "تنفيذ فوري",
                },
                {
                  icon: HiShieldCheck,
                  title: "حماية كاملة",
                },
                {
                  icon: HiCurrencyDollar,
                  title: "أسعار تنافسية",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    flex
                    items-center
                    gap-4
                    bg-black/[0.03]
                    dark:bg-white/[0.03]
                    border
                    border-black/5
                    dark:border-white/5
                    rounded-2xl
                    p-4
                  "
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      bg-primary/10
                      border
                      border-primary/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <item.icon
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <p
                    className="
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="
          py-28
          overflow-hidden
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        <div className="text-center mb-14">

          <h2
            className="
              text-4xl
              sm:text-5xl
              font-black
              mb-5
            "
          >
            آراء العملاء
          </h2>

          <p
            className="
              text-slate-600
              dark:text-slate-400
            "
          >
            تجربة استخدام ممتازة بسرعة حقيقية.
          </p>
        </div>

        <div className="relative">

          <div
            className="
              absolute
              left-0
              top-0
              w-52
              h-full
              bg-gradient-to-r
              from-white
              dark:from-[#060816]
              to-transparent
              z-10
            "
          />

          <div
            className="
              absolute
              right-0
              top-0
              w-52
              h-full
              bg-gradient-to-l
              from-white
              dark:from-[#060816]
              to-transparent
              z-10
            "
          />

          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            }}
          >

            {duplicatedTestimonials.map((r, i) => (
              <div
                key={i}
                className="
                  w-[360px]
                  shrink-0
                  bg-black/[0.03]
                  dark:bg-white/[0.03]
                  border
                  border-black/5
                  dark:border-white/5
                  rounded-3xl
                  p-7
                "
              >

                <div className="flex gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} size={16} />
                  ))}
                </div>

                <p
                  className="
                    leading-relaxed
                    text-slate-600
                    dark:text-slate-400
                    mb-6
                  "
                >
                  "{r.text}"
                </p>

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-12
                      h-12
                      rounded-full
                      bg-primary/10
                      border
                      border-primary/20
                      flex
                      items-center
                      justify-center
                      text-primary
                      font-black
                    "
                  >
                    {r.name[0]}
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      {r.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {r.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PAYMENT */}
      <section
        className="
          py-28
          border-b
          border-black/5
          dark:border-white/5
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            text-center
          "
        >

          <h2
            className="
              text-4xl
              sm:text-5xl
              font-black
              mb-5
            "
          >
            طرق الدفع العالمية
          </h2>

          <p
            className="
              text-slate-600
              dark:text-slate-400
              mb-14
            "
          >
            ادفع بالطريقة التي تناسبك من أي مكان.
          </p>

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-6
            "
          >

            {[
              {
                icon: FaCcVisa,
                name: "Visa",
              },
              {
                icon: FaCcMastercard,
                name: "MasterCard",
              },
              {
                icon: FaCcPaypal,
                name: "PayPal",
              },
              {
                icon: FaBitcoin,
                name: "Crypto",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  rounded-3xl
                  p-8
                  bg-black/[0.03]
                  dark:bg-white/[0.03]
                  border
                  border-black/5
                  dark:border-white/5
                "
              >

                <item.icon
                  size={42}
                  className="
                    mx-auto
                    mb-5
                    text-primary
                  "
                />

                <h3 className="font-semibold">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28">

        <div
          className="
            max-w-4xl
            mx-auto
            px-6
          "
        >

          <div className="text-center mb-14">

            <h2
              className="
                text-4xl
                sm:text-5xl
                font-black
                mb-5
              "
            >
              الأسئلة الشائعة
            </h2>

            <p
              className="
                text-slate-600
                dark:text-slate-400
              "
            >
              كل ما تحتاج معرفته قبل البدء.
            </p>
          </div>

          <div className="space-y-5">

            {faq.map((item, i) => (
              <details
                key={i}
                className="
                  group
                  rounded-3xl
                  p-6
                  bg-black/[0.03]
                  dark:bg-white/[0.03]
                  border
                  border-black/5
                  dark:border-white/5
                "
              >

                <summary
                  className="
                    list-none
                    cursor-pointer
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      font-semibold
                      text-lg
                    "
                  >
                    {item.q}
                  </span>

                  <span
                    className="
                      text-primary
                      text-2xl
                      transition-transform
                      group-open:rotate-45
                    "
                  >
                    +
                  </span>
                </summary>

                <p
                  className="
                    mt-5
                    leading-relaxed
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}