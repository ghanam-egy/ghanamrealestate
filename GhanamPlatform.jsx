/**
 * GHANAM REAL ESTATE PLATFORM
 * Complete Production UI — Phase 4 Delivery
 * غنام للعقارات — المحلة الكبرى
 *
 * Architecture: Feature-based React components
 * Design: Luxury Dark + Gold — RTL Arabic-first
 * All pages: Homepage, Properties, Property Detail,
 *            Districts, Blog, About, Contact, Admin Dashboard
 */

import { useState, useEffect, useRef, useCallback } from "react"

// ═══════════════════════════════════════════════════════════
// DESIGN TOKENS & CONSTANTS
// ═══════════════════════════════════════════════════════════

const COLORS = {
  gold:       "#C9A85E",
  goldLight:  "#D4B97A",
  goldDark:   "#A8863A",
  goldGlow:   "rgba(201,168,94,0.15)",
  dark800:    "#1A1A1A",
  dark700:    "#222222",
  dark600:    "#2A2A2A",
  dark500:    "#333333",
  dark400:    "#444444",
  dark300:    "#666666",
  dark200:    "#888888",
  dark100:    "#BBBBBB",
  white:      "#FFFFFF",
  white90:    "#F5F5F5",
  white70:    "#B3B3B3",
  waGreen:    "#25D366",
  success:    "#22C55E",
  error:      "#EF4444",
  warning:    "#F59E0B",
}

const WHATSAPP_NUMBER = "201011244308"
const PHONE_NUMBER    = "01011244308"

// ═══════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════

const DISTRICTS = [
  { id:"1", slug:"shokry",    nameAr:"حي شقيق",       count:42, avgMin:800000,  avgMax:2000000,
    img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80" },
  { id:"2", slug:"abu-shahin",nameAr:"حي أبو شاهين",  count:28, avgMin:600000,  avgMax:1500000,
    img:"https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80" },
  { id:"3", slug:"el-bander", nameAr:"حي البندر",     count:35, avgMin:700000,  avgMax:1800000,
    img:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
  { id:"4", slug:"mubarak",   nameAr:"حي مبارك",      count:31, avgMin:900000,  avgMax:2500000,
    img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" },
  { id:"5", slug:"mahatta",   nameAr:"منطقة المحطة",  count:19, avgMin:500000,  avgMax:1200000,
    img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" },
]

const PROPERTIES = [
  { id:"p1", slug:"shqq-3-ghrf-7y-shqyq", referenceCode:"GH-2025-0001", featured:true,  verified:true,
    titleAr:"شقة 3 غرف في حي شقيق المحلة الكبرى", purpose:"SALE", type:"APARTMENT",
    status:"ACTIVE", price:1200000, area:150, bedrooms:3, bathrooms:2, floor:3,
    furnished:"UNFURNISHED", district:{nameAr:"حي شقيق",slug:"shokry"},
    images:[{url:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",alt:"شقة شقيق"}],
    descriptionAr:"شقة رائعة في قلب حي شقيق بالمحلة الكبرى، في موقع مميز وقريبة من جميع الخدمات.",
    negotiable:true, viewCount:247 },
  { id:"p2", slug:"shqq-2-ghrf-7y-lbndr",  referenceCode:"GH-2025-0002", featured:false, verified:true,
    titleAr:"شقة 2 غرف في حي البندر",            purpose:"SALE", type:"APARTMENT",
    status:"ACTIVE", price:850000,  area:110, bedrooms:2, bathrooms:1, floor:2,
    furnished:"SEMI_FURNISHED", district:{nameAr:"حي البندر",slug:"el-bander"},
    images:[{url:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",alt:"شقة البندر"}],
    descriptionAr:"شقة أنيقة في موقع مركزي بحي البندر، مناسبة للزوجين أو الأسرة الصغيرة.",
    negotiable:false, viewCount:183 },
  { id:"p3", slug:"doblks-4-ghrf-7y-mbrk", referenceCode:"GH-2025-0003", featured:true,  verified:true,
    titleAr:"دوبلكس 4 غرف فاخر في حي مبارك",    purpose:"SALE", type:"DUPLEX",
    status:"ACTIVE", price:2500000, area:220, bedrooms:4, bathrooms:3, floor:5,
    furnished:"FURNISHED", district:{nameAr:"حي مبارك",slug:"mubarak"},
    images:[{url:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",alt:"دوبلكس مبارك"}],
    descriptionAr:"دوبلكس فاخر مكوّن من طابقين في أحدث مباني حي مبارك، تشطيب سوبر لوكس.",
    negotiable:true, viewCount:412 },
  { id:"p4", slug:"shqq-3-ghrf-abw-shahen", referenceCode:"GH-2025-0004", featured:false, verified:true,
    titleAr:"شقة 3 غرف في أبو شاهين",           purpose:"RENT", type:"APARTMENT",
    status:"ACTIVE", price:6000,   area:130, bedrooms:3, bathrooms:2, floor:1,
    furnished:"UNFURNISHED", district:{nameAr:"حي أبو شاهين",slug:"abu-shahin"},
    images:[{url:"https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",alt:"شقة أبو شاهين"}],
    descriptionAr:"شقة واسعة في حي أبو شاهين، مناسبة للعائلات، قريبة من المدارس.",
    negotiable:true, viewCount:98 },
  { id:"p5", slug:"shqq-2-ghrf-lmhtt",     referenceCode:"GH-2025-0005", featured:false, verified:false,
    titleAr:"شقة 2 غرف قرب المحطة",             purpose:"SALE", type:"APARTMENT",
    status:"ACTIVE", price:700000,  area:95,  bedrooms:2, bathrooms:1, floor:4,
    furnished:"UNFURNISHED", district:{nameAr:"منطقة المحطة",slug:"mahatta"},
    images:[{url:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",alt:"شقة المحطة"}],
    descriptionAr:"شقة بموقع مميز جداً بالقرب من محطة المحلة الكبرى، مناسبة للاستثمار.",
    negotiable:false, viewCount:67 },
  { id:"p6", slug:"fela-7y-shqyq",          referenceCode:"GH-2025-0006", featured:true,  verified:true,
    titleAr:"فيلا راقية في حي شقيق",            purpose:"SALE", type:"VILLA",
    status:"ACTIVE", price:4500000, area:380, bedrooms:5, bathrooms:4, floor:1,
    furnished:"FURNISHED", district:{nameAr:"حي شقيق",slug:"shokry"},
    images:[{url:"https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=800&q=80",alt:"فيلا شقيق"}],
    descriptionAr:"فيلا فاخرة مستقلة في أرقى مناطق حي شقيق، بحديقة خاصة وجراج.",
    negotiable:true, viewCount:521 },
]

const BLOG_POSTS = [
  { id:"b1", slug:"afdl-ahya-lmhll-llskn", titleAr:"أفضل 5 أحياء في المحلة الكبرى للسكن 2025",
    category:"districts", excerpt:"دليل شامل لأفضل الأحياء في المحلة الكبرى من حيث الأسعار والخدمات والهدوء.",
    img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", date:"2025-05-15" },
  { id:"b2", slug:"asar-shqq-lmhll-2025",   titleAr:"أسعار الشقق في المحلة الكبرى — تقرير 2025",
    category:"market-news", excerpt:"تحليل شامل لأسعار العقارات في المحلة الكبرى خلال 2025 ومتوقعات السوق.",
    img:"https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80", date:"2025-05-02" },
  { id:"b3", slug:"dlyl-shra-shqq-lmhll",   titleAr:"دليل شراء الشقق في المحلة الكبرى — خطوة بخطوة",
    category:"buying-guide", excerpt:"كل ما تحتاج معرفته قبل شراء شقتك في المحلة الكبرى، من البحث حتى توقيع العقد.",
    img:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", date:"2025-04-20" },
]

const TESTIMONIALS = [
  { id:"t1", name:"أحمد السيد",   location:"المحلة الكبرى",   rating:5,
    content:"عبدالرحمن ساعدني أجد شقة في حي شقيق بسعر ممتاز وفي وقت قصير جداً. الشفافية التامة في التعامل هي ما ميّزه.",
    type:"مشتري شقة" },
  { id:"t2", name:"محمد خليل",    location:"الرياض، السعودية", rating:5,
    content:"أفضل تجربة شراء عقار في حياتي وأنا خارج مصر. تواصلنا عبر واتساب وأنهينا كل شيء بكل سهولة ومصداقية.",
    type:"مستثمر من الخارج" },
  { id:"t3", name:"أم محمود",     location:"المحلة الكبرى",   rating:5,
    content:"بعت شقتي بأفضل سعر ممكن بفضل عبدالرحمن. متابعة مستمرة ومعاملة محترمة جداً.",
    type:"بائعة عقار" },
]

const FEATURES_LIST = [
  { icon:"🏢", label:"مصعد" },     { icon:"🔒", label:"أمن 24 ساعة" },
  { icon:"🚗", label:"جراج" },     { icon:"📹", label:"كاميرات مراقبة" },
  { icon:"❄️", label:"تكييف" },   { icon:"🔥", label:"غاز طبيعي" },
  { icon:"🌐", label:"إنترنت" },  { icon:"💧", label:"مياه مستمرة" },
]

// ═══════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════

const formatPrice = (price, purpose="SALE") => {
  if (purpose === "RENT") return `${price.toLocaleString("ar-EG")} ج.م / شهر`
  if (price >= 1_000_000) {
    const m = price / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)} مليون ج.م`
  }
  return `${price.toLocaleString("ar-EG")} ج.م`
}

const formatArea = (area) => `${area} م²`

const buildWhatsAppUrl = (msg = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

const propertyTypeAr = {
  APARTMENT:"شقة", VILLA:"فيلا", DUPLEX:"دوبلكس",
  STUDIO:"استوديو", COMMERCIAL:"محل تجاري", LAND:"أرض",
  BUILDING:"عمارة", OFFICE:"مكتب",
}

const purposeAr = { SALE:"للبيع", RENT:"للإيجار" }

// ═══════════════════════════════════════════════════════════
// GLOBAL STYLES
// ═══════════════════════════════════════════════════════════

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold:       #C9A85E;
      --gold-light: #D4B97A;
      --gold-dark:  #A8863A;
      --gold-glow:  rgba(201,168,94,0.15);
      --dark-800:   #1A1A1A;
      --dark-700:   #222222;
      --dark-600:   #2A2A2A;
      --dark-500:   #333333;
      --dark-400:   #444444;
      --dark-300:   #666666;
      --dark-200:   #888888;
      --dark-100:   #BBBBBB;
      --white:      #FFFFFF;
      --wa-green:   #25D366;
      --success:    #22C55E;
      --error:      #EF4444;
      --r-card:     16px;
      --r-btn:      12px;
      --r-pill:     100px;
      font-family: 'Cairo', 'Tajawal', Arial, sans-serif;
    }

    html { scroll-behavior: smooth; direction: rtl; }
    body { background: var(--dark-800); color: var(--white); overflow-x: hidden; }

    ::-webkit-scrollbar       { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--dark-700); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 3px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; } to { opacity:1; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes pulse-ring {
      0%   { transform:scale(1);   opacity:.6; }
      100% { transform:scale(1.8); opacity:0; }
    }
    @keyframes gold-shine {
      0%   { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    @keyframes float {
      0%,100% { transform:translateY(0); }
      50%     { transform:translateY(-8px); }
    }
    @keyframes slideInRight {
      from { opacity:0; transform:translateX(40px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes slideInLeft {
      from { opacity:0; transform:translateX(-40px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity:0; transform:scale(0.92); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes countUp {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }

    .fade-up    { animation: fadeUp   0.5s ease-out forwards; }
    .fade-in    { animation: fadeIn   0.4s ease-out forwards; }
    .slide-right{ animation: slideInRight 0.5s ease-out forwards; }
    .scale-in   { animation: scaleIn  0.4s ease-out forwards; }

    /* Skeleton loader */
    .skeleton {
      background: linear-gradient(90deg,
        var(--dark-700) 25%, var(--dark-600) 50%, var(--dark-700) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    /* Gold gradient text */
    .gold-text {
      background: linear-gradient(135deg, #C9A85E 0%, #E5D4A8 40%, #C9A85E 60%, #A8863A 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Scrollable horizontal strip */
    .scroll-x {
      overflow-x: auto; display:flex; gap:16px;
      padding-bottom:8px; scrollbar-width:none;
    }
    .scroll-x::-webkit-scrollbar { display:none; }

    /* Line clamp */
    .clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .clamp-1 { display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
  `}</style>
)

// ═══════════════════════════════════════════════════════════
// SHARED UI PRIMITIVES
// ═══════════════════════════════════════════════════════════

const Btn = ({ variant="primary", size="md", children, onClick, href, style={}, disabled=false, type="button" }) => {
  const sizes = {
    lg: { padding:"14px 28px", fontSize:"16px", borderRadius:"12px", height:"52px" },
    md: { padding:"11px 22px", fontSize:"14px", borderRadius:"12px", height:"44px" },
    sm: { padding:"8px 16px",  fontSize:"13px", borderRadius:"10px", height:"36px" },
  }
  const variants = {
    primary: {
      background:"linear-gradient(135deg,#C9A85E 0%,#D4B97A 45%,#C9A85E 55%,#A8863A 100%)",
      color:"#0F0F0F", border:"none",
      boxShadow:"0 4px 20px rgba(201,168,94,0.3)",
    },
    whatsapp: {
      background:"#25D366", color:"#fff", border:"none",
      boxShadow:"0 4px 20px rgba(37,211,102,0.3)",
    },
    outline: {
      background:"transparent", color:"#C9A85E",
      border:"1px solid #C9A85E",
    },
    ghost: {
      background:"#2A2A2A", color:"#F5F5F5", border:"none",
    },
    danger: {
      background:"rgba(239,68,68,0.1)", color:"#EF4444",
      border:"1px solid rgba(239,68,68,0.3)",
    },
  }
  const s = {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    gap:"8px", fontFamily:"Cairo,sans-serif", fontWeight:600,
    cursor:disabled?"not-allowed":"pointer",
    transition:"all 0.2s ease", whiteSpace:"nowrap",
    opacity: disabled ? 0.5 : 1, textDecoration:"none",
    ...sizes[size], ...variants[variant], ...style,
  }
  const [hov, setHov] = useState(false)
  const hStyle = hov && !disabled ? {
    transform:"translateY(-1px) scale(1.02)",
    boxShadow: variant==="primary" ? "0 8px 32px rgba(201,168,94,0.4)"
             : variant==="whatsapp" ? "0 8px 32px rgba(37,211,102,0.4)"
             : undefined,
  } : {}
  if (href) return (
    <a href={href} style={{...s,...hStyle}}
       onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
    </a>
  )
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{...s,...hStyle}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {children}
    </button>
  )
}

const Badge = ({ variant="default", children, style={} }) => {
  const variants = {
    verified: { bg:"rgba(34,197,94,0.12)", color:"#22C55E", border:"1px solid rgba(34,197,94,0.35)" },
    featured: { bg:"linear-gradient(135deg,#C9A85E,#A8863A)", color:"#0F0F0F", border:"none" },
    sale:     { bg:"rgba(201,168,94,0.15)", color:"#C9A85E", border:"1px solid rgba(201,168,94,0.3)" },
    rent:     { bg:"rgba(59,130,246,0.15)", color:"#60A5FA", border:"1px solid rgba(59,130,246,0.3)" },
    default:  { bg:"#333", color:"#BBB", border:"1px solid #444" },
  }
  const v = variants[variant] || variants.default
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:"4px",
      padding:"3px 10px", borderRadius:"100px", fontSize:"12px", fontWeight:600,
      background:v.bg, color:v.color, border:v.border, ...style,
    }}>{children}</span>
  )
}

const Input = ({ label, placeholder, value, onChange, type="text", style={}, error, name }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:"6px", ...style }}>
    {label && <label style={{ fontSize:"13px", color:"#B3B3B3", fontWeight:500 }}>{label}</label>}
    <input
      name={name} type={type} placeholder={placeholder}
      value={value} onChange={onChange}
      style={{
        background:"#2A2A2A", border:`1px solid ${error?"#EF4444":"#444"}`,
        borderRadius:"12px", padding:"13px 16px", fontSize:"14px",
        color:"#FFF", outline:"none", fontFamily:"Cairo,sans-serif",
        width:"100%", height:"50px", transition:"border-color 0.2s",
        direction:"rtl",
      }}
      onFocus={e=>e.target.style.borderColor="#C9A85E"}
      onBlur={e=>e.target.style.borderColor=error?"#EF4444":"#444"}
    />
    {error && <span style={{fontSize:"12px",color:"#EF4444"}}>{error}</span>}
  </div>
)

const Select = ({ label, value, onChange, options, style={} }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:"6px", ...style }}>
    {label && <label style={{ fontSize:"13px", color:"#B3B3B3", fontWeight:500 }}>{label}</label>}
    <select value={value} onChange={onChange} style={{
      background:"#2A2A2A", border:"1px solid #444", borderRadius:"12px",
      padding:"0 16px", fontSize:"14px", color:"#FFF", height:"50px",
      fontFamily:"Cairo,sans-serif", cursor:"pointer", width:"100%",
      outline:"none", direction:"rtl",
      appearance:"none", backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
      backgroundRepeat:"no-repeat", backgroundPosition:"left 14px center",
    }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
)

const Divider = ({ style={} }) => (
  <div style={{ height:"1px", background:"linear-gradient(to left,transparent,#333,transparent)", ...style }} />
)

const Section = ({ children, style={}, id="" }) => (
  <section id={id} style={{ padding:"80px 0", ...style }}>{children}</section>
)

const Container = ({ children, style={} }) => (
  <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"0 24px", ...style }}>{children}</div>
)

const SectionTitle = ({ title, subtitle, centered=false, style={} }) => (
  <div style={{ marginBottom:"48px", textAlign:centered?"center":"right", ...style }}>
    <h2 style={{ fontSize:"32px", fontWeight:700, color:"#FFF", marginBottom:"12px", lineHeight:1.3 }}>
      {title}
    </h2>
    {subtitle && <p style={{ fontSize:"16px", color:"#888", lineHeight:1.7 }}>{subtitle}</p>}
  </div>
)

// ═══════════════════════════════════════════════════════════
// PROPERTY CARD
// ═══════════════════════════════════════════════════════════

const PropertyCard = ({ property, onView, style={} }) => {
  const [hov, setHov] = useState(false)
  const [fav, setFav] = useState(false)
  const img = property.images[0]?.url
  const isRent = property.purpose === "RENT"

  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>onView(property)}
      style={{
        background: hov ? "#2A2A2A" : "#222222",
        borderRadius:"16px", overflow:"hidden", cursor:"pointer",
        border:`1px solid ${hov ? "#C9A85E" : "#2A2A2A"}`,
        transition:"all 0.3s ease",
        boxShadow: hov ? "0 8px 40px rgba(201,168,94,0.18), 0 2px 8px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.3)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        ...style,
      }}
    >
      {/* Image */}
      <div style={{ position:"relative", overflow:"hidden", height:"200px" }}>
        <img src={img} alt={property.titleAr} style={{
          width:"100%", height:"100%", objectFit:"cover",
          transform: hov ? "scale(1.05)" : "scale(1)",
          transition:"transform 0.5s ease",
        }} />
        {/* Gradient overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)",
        }} />
        {/* Badges */}
        <div style={{ position:"absolute", top:"12px", right:"12px", display:"flex", gap:"6px", flexWrap:"wrap" }}>
          {property.verified && <Badge variant="verified">✓ موثق</Badge>}
          {property.featured && <Badge variant="featured">⭐ مميز</Badge>}
        </div>
        {/* Purpose */}
        <div style={{ position:"absolute", top:"12px", left:"12px" }}>
          <Badge variant={isRent?"rent":"sale"}>{purposeAr[property.purpose]}</Badge>
        </div>
        {/* Favorite */}
        <button
          onClick={e=>{e.stopPropagation();setFav(!fav)}}
          style={{
            position:"absolute", bottom:"12px", left:"12px",
            background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)",
            border:"none", borderRadius:"50%", width:"36px", height:"36px",
            cursor:"pointer", fontSize:"18px", color: fav?"#EF4444":"#FFF",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.2s",
          }}
        >{fav ? "❤️" : "🤍"}</button>
      </div>

      {/* Content */}
      <div style={{ padding:"16px" }}>
        {/* Price */}
        <div style={{ fontSize:"22px", fontWeight:700, color:"#C9A85E", marginBottom:"8px",
          fontVariantNumeric:"tabular-nums" }}>
          {formatPrice(property.price, property.purpose)}
          {property.negotiable && (
            <span style={{ fontSize:"12px", color:"#F59E0B", marginRight:"8px",
              background:"rgba(245,158,11,0.1)", padding:"2px 8px", borderRadius:"100px" }}>
              قابل للتفاوض
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="clamp-2" style={{ fontSize:"15px", fontWeight:600, color:"#F5F5F5",
          lineHeight:1.5, marginBottom:"8px" }}>
          {property.titleAr}
        </h3>

        {/* Location */}
        <p style={{ fontSize:"13px", color:"#888", marginBottom:"12px" }}>
          📍 {property.district.nameAr}، المحلة الكبرى
        </p>

        <Divider style={{ marginBottom:"12px" }} />

        {/* Specs */}
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"14px" }}>
          {[
            { icon:"🛏", val:`${property.bedrooms} غرف`  },
            { icon:"🚿", val:`${property.bathrooms} حمام` },
            { icon:"📐", val:formatArea(property.area)    },
          ].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"4px",
              fontSize:"13px", color:"#BBB" }}>
              <span>{s.icon}</span>
              <span>{s.val}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }} onClick={e=>e.stopPropagation()}>
          <Btn variant="whatsapp" size="sm"
            href={buildWhatsAppUrl(`مرحبا، أريد الاستفسار عن ${property.titleAr} (${property.referenceCode})`)}>
            📱 واتساب
          </Btn>
          <Btn variant="outline" size="sm" onClick={()=>onView(property)}>
            التفاصيل
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════

const Header = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const navLinks = [
    { label:"الرئيسية", id:"home" },
    { label:"العقارات", id:"properties" },
    { label:"الأحياء",  id:"districts" },
    { label:"المدونة",  id:"blog" },
    { label:"عن المحلة",id:"about" },
    { label:"تواصل معنا",id:"contact" },
  ]

  return (
    <>
      <header style={{
        position:"fixed", top:0, right:0, left:0, zIndex:100,
        height:"72px", display:"flex", alignItems:"center",
        background: scrolled ? "rgba(15,15,15,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
        transition:"all 0.3s ease",
      }}>
        <Container style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%" }}>
          {/* Logo */}
          <div onClick={()=>setPage("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{
              width:"40px", height:"40px", borderRadius:"10px",
              background:"linear-gradient(135deg,#C9A85E,#A8863A)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"20px",
            }}>🏠</div>
            <div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#FFF", lineHeight:1.2 }}>غنام للعقارات</div>
              <div style={{ fontSize:"10px", color:"#C9A85E", letterSpacing:"0.5px" }}>GHANAM REAL ESTATE</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav style={{ display:"flex", gap:"4px", alignItems:"center" }}
               className="desktop-nav">
            {navLinks.map(l => (
              <button key={l.id} onClick={()=>setPage(l.id)} style={{
                background:"none", border:"none", padding:"8px 12px",
                fontSize:"14px", fontWeight:500, cursor:"pointer",
                color: page===l.id ? "#C9A85E" : "#B3B3B3",
                fontFamily:"Cairo,sans-serif", borderRadius:"8px",
                transition:"all 0.2s",
              }}
              onMouseEnter={e=>{ if(page!==l.id) e.target.style.color="#FFF" }}
              onMouseLeave={e=>{ if(page!==l.id) e.target.style.color="#B3B3B3" }}>
                {l.label}
              </button>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <Btn variant="whatsapp" size="sm"
              href={buildWhatsAppUrl("مرحبا، أريد الاستفسار عن عقار")}
              style={{ display:"flex" }}>
              📱 واتساب
            </Btn>
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{
              background:"#2A2A2A", border:"none", borderRadius:"8px",
              width:"40px", height:"40px", cursor:"pointer",
              display:"flex", flexDirection:"column", alignItems:"center",
              justifyContent:"center", gap:"5px", padding:"10px",
            }} className="mobile-menu-btn">
              {[0,1,2].map(i=>(
                <span key={i} style={{
                  display:"block", width:"18px", height:"2px",
                  background:"#FFF", borderRadius:"2px",
                  transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)"
                           : menuOpen && i===1 ? "opacity:0"
                           : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)"
                           : "none",
                  transition:"all 0.2s",
                }} />
              ))}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position:"fixed", top:"72px", right:0, left:0, zIndex:99,
          background:"rgba(15,15,15,0.98)", backdropFilter:"blur(20px)",
          borderBottom:"1px solid #2A2A2A", padding:"16px 24px",
          display:"flex", flexDirection:"column", gap:"4px",
          animation:"fadeIn 0.2s ease",
        }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={()=>{setPage(l.id);setMenuOpen(false)}} style={{
              background:"none", border:"none", padding:"14px 16px",
              fontSize:"16px", fontWeight:500, cursor:"pointer",
              color: page===l.id ? "#C9A85E" : "#F5F5F5",
              fontFamily:"Cairo,sans-serif", textAlign:"right",
              borderBottom:"1px solid #2A2A2A", borderRadius:"8px",
            }}>
              {l.label}
            </button>
          ))}
          <Btn variant="whatsapp" size="md"
            href={buildWhatsAppUrl("مرحبا، أريد الاستفسار")}
            style={{ marginTop:"8px" }}>
            📱 تواصل عبر واتساب — {PHONE_NUMBER}
          </Btn>
        </div>
      )}

      {/* WhatsApp FAB */}
      <a href={buildWhatsAppUrl("مرحبا غنام للعقارات")} target="_blank" rel="noreferrer"
        style={{
          position:"fixed", bottom:"90px", left:"20px", zIndex:99,
          width:"56px", height:"56px", borderRadius:"50%",
          background:"#25D366", display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:"26px",
          boxShadow:"0 4px 20px rgba(37,211,102,0.4)",
          textDecoration:"none",
        }}>
        <span style={{ position:"absolute", inset:0, borderRadius:"50%",
          background:"#25D366", animation:"pulse-ring 2s ease-out infinite" }} />
        💬
      </a>

      <style>{`
        @media (min-width: 768px) { .mobile-menu-btn { display:none !important; } }
        @media (max-width: 767px) { .desktop-nav { display:none !important; } }
        @keyframes pulse-ring {
          0%   { transform:scale(1); opacity:0.6; }
          100% { transform:scale(1.8); opacity:0; }
        }
      `}</style>
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════

const Footer = ({ setPage }) => (
  <footer style={{ background:"#0F0F0F", borderTop:"1px solid #2A2A2A", padding:"60px 0 30px" }}>
    <Container>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"40px", marginBottom:"40px" }}>
        {/* Brand */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
            <div style={{ width:"40px",height:"40px",borderRadius:"10px",
              background:"linear-gradient(135deg,#C9A85E,#A8863A)",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px" }}>🏠</div>
            <div>
              <div style={{ fontSize:"16px",fontWeight:700,color:"#FFF" }}>غنام للعقارات</div>
              <div style={{ fontSize:"11px",color:"#C9A85E" }}>المحلة الكبرى، مصر</div>
            </div>
          </div>
          <p style={{ fontSize:"14px",color:"#888",lineHeight:1.8,marginBottom:"20px" }}>
            متخصصون في العقارات بالمحلة الكبرى. عقارات موثقة وأسعار شفافة.
          </p>
          <div style={{ display:"flex",gap:"8px" }}>
            {["📘","📸","🎵"].map((icon,i)=>(
              <a key={i} href="#" style={{
                width:"36px",height:"36px",borderRadius:"8px",background:"#2A2A2A",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:"16px",textDecoration:"none",
                transition:"background 0.2s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background="#333"}
              onMouseLeave={e=>e.currentTarget.style.background="#2A2A2A"}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",marginBottom:"16px" }}>روابط سريعة</h3>
          {[
            {label:"الصفحة الرئيسية",id:"home"},
            {label:"جميع العقارات", id:"properties"},
            {label:"الأحياء",       id:"districts"},
            {label:"المدونة",       id:"blog"},
            {label:"عن المحلة",    id:"about"},
            {label:"أضف عقارك",   id:"add-property"},
          ].map(l=>(
            <button key={l.id} onClick={()=>setPage(l.id)} style={{
              display:"block",background:"none",border:"none",
              fontSize:"14px",color:"#888",padding:"4px 0",
              cursor:"pointer",fontFamily:"Cairo,sans-serif",
              transition:"color 0.2s", textAlign:"right",
            }}
            onMouseEnter={e=>e.target.style.color="#C9A85E"}
            onMouseLeave={e=>e.target.style.color="#888"}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Districts */}
        <div>
          <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",marginBottom:"16px" }}>الأحياء</h3>
          {DISTRICTS.map(d=>(
            <button key={d.id} onClick={()=>setPage("districts")} style={{
              display:"block",background:"none",border:"none",
              fontSize:"14px",color:"#888",padding:"4px 0",
              cursor:"pointer",fontFamily:"Cairo,sans-serif",
              transition:"color 0.2s", textAlign:"right",
            }}
            onMouseEnter={e=>e.target.style.color="#C9A85E"}
            onMouseLeave={e=>e.target.style.color="#888"}>
              {d.nameAr}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",marginBottom:"16px" }}>تواصل معنا</h3>
          {[
            { icon:"📱", label:"واتساب", val:PHONE_NUMBER, href:`https://wa.me/${WHATSAPP_NUMBER}` },
            { icon:"📞", label:"هاتف",   val:PHONE_NUMBER, href:`tel:+${WHATSAPP_NUMBER}` },
            { icon:"📍", label:"العنوان",val:"المحلة الكبرى، الغربية، مصر" },
          ].map((c,i)=>(
            <div key={i} style={{ display:"flex",gap:"10px",alignItems:"flex-start",
              marginBottom:"12px" }}>
              <span style={{ fontSize:"16px",marginTop:"2px" }}>{c.icon}</span>
              <div>
                <div style={{ fontSize:"12px",color:"#666",marginBottom:"2px" }}>{c.label}</div>
                {c.href
                  ? <a href={c.href} style={{ fontSize:"14px",color:"#C9A85E",textDecoration:"none" }}>{c.val}</a>
                  : <span style={{ fontSize:"13px",color:"#888" }}>{c.val}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider style={{ marginBottom:"24px" }} />

      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px" }}>
        <p style={{ fontSize:"13px",color:"#555" }}>
          © 2025 غنام للعقارات — جميع الحقوق محفوظة
        </p>
        <div style={{ display:"flex",gap:"16px" }}>
          {["سياسة الخصوصية","الشروط والأحكام"].map((t,i)=>(
            <button key={i} style={{ background:"none",border:"none",
              fontSize:"13px",color:"#555",cursor:"pointer",fontFamily:"Cairo,sans-serif" }}
            onMouseEnter={e=>e.target.style.color="#C9A85E"}
            onMouseLeave={e=>e.target.style.color="#555"}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </Container>
  </footer>
)

// ═══════════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════════

const HomePage = ({ setPage, setSelectedProperty }) => {
  const [searchForm, setSearchForm] = useState({ type:"", district:"", purpose:"SALE", beds:"" })
  const [visibleSections, setVisibleSections] = useState(new Set())
  const observerRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisibleSections(prev => new Set([...prev, e.target.id]))
      }),
      { threshold: 0.15 }
    )
    Object.values(observerRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setRef = (id) => (el) => { observerRefs.current[id] = el }

  const featured = PROPERTIES.filter(p => p.featured).slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight:"100vh", position:"relative", overflow:"hidden",
        display:"flex", alignItems:"center",
        background:"linear-gradient(135deg,#0A0A0A 0%,#1A1A1A 100%)",
      }}>
        {/* Background image */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)",
          backgroundSize:"cover", backgroundPosition:"center",
          opacity:0.25,
        }} />
        {/* Gradient overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to left, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.3) 100%)",
        }} />
        {/* Gold accent line */}
        <div style={{
          position:"absolute", bottom:0, right:0, left:0,
          height:"2px",
          background:"linear-gradient(to left,transparent,#C9A85E,transparent)",
        }} />

        <Container style={{ position:"relative", zIndex:1, paddingTop:"100px", paddingBottom:"120px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"48px", alignItems:"center" }}>
            {/* Left: Text */}
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px",
                background:"rgba(201,168,94,0.1)", border:"1px solid rgba(201,168,94,0.25)",
                borderRadius:"100px", padding:"6px 16px", marginBottom:"24px",
                animation:"fadeIn 0.6s ease forwards" }}>
                <span style={{ fontSize:"12px", color:"#C9A85E", fontWeight:600 }}>
                  ✓ عقارات موثقة • المحلة الكبرى
                </span>
              </div>

              <h1 style={{
                fontSize:"clamp(32px,5vw,60px)", fontWeight:900,
                lineHeight:1.2, color:"#FFF", marginBottom:"16px",
                animation:"slideInRight 0.7s ease forwards",
              }}>
                إحنا مش بنبيع عقارات...
                <br />
                <span className="gold-text">إحنا بنساعدك تختار</span>
                <br />
                صح في المحلة
              </h1>

              <p style={{
                fontSize:"18px", color:"#B3B3B3", lineHeight:1.8,
                marginBottom:"12px",
                animation:"slideInRight 0.8s ease 0.1s both forwards",
              }}>
                مع عبدالرحمن غنام — خبرتك العقارية في المحلة الكبرى
              </p>
              <p style={{
                fontSize:"14px", color:"#C9A85E", marginBottom:"36px",
                animation:"slideInRight 0.8s ease 0.2s both forwards",
              }}>
                الشفافية · المصداقية · الخبرة المحلية
              </p>

              <div style={{
                display:"flex", gap:"12px", flexWrap:"wrap",
                animation:"slideInRight 0.8s ease 0.3s both forwards",
              }}>
                <Btn variant="primary" size="lg" onClick={()=>setPage("properties")}
                  style={{ minWidth:"160px" }}>
                  🏠 تصفح العقارات
                </Btn>
                <Btn variant="whatsapp" size="lg"
                  href={buildWhatsAppUrl("مرحبا، أريد استشارة عقارية مجانية")}
                  style={{ minWidth:"180px" }}>
                  📱 تواصل عبر واتساب
                </Btn>
              </div>

              {/* Stats */}
              <div style={{
                display:"flex", gap:"32px", marginTop:"48px", flexWrap:"wrap",
                animation:"fadeIn 0.8s ease 0.5s both forwards",
              }}>
                {[
                  { num:"150+", label:"عقار تم بيعه" },
                  { num:"5+",   label:"سنوات خبرة" },
                  { num:"300+", label:"عميل راضٍ" },
                ].map((s,i)=>(
                  <div key={i}>
                    <div style={{ fontSize:"28px", fontWeight:700, color:"#C9A85E" }}>{s.num}</div>
                    <div style={{ fontSize:"13px", color:"#888" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Founder card */}
            <div style={{
              background:"linear-gradient(135deg,rgba(201,168,94,0.08),rgba(201,168,94,0.02))",
              border:"1px solid rgba(201,168,94,0.2)",
              borderRadius:"20px", padding:"28px",
              backdropFilter:"blur(10px)",
              animation:"scaleIn 0.8s ease 0.2s both forwards",
              minWidth:"220px", textAlign:"center",
            }}>
              <div style={{
                width:"100px", height:"100px", borderRadius:"50%",
                margin:"0 auto 16px",
                background:"linear-gradient(135deg,#C9A85E,#A8863A)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"40px",
                boxShadow:"0 0 40px rgba(201,168,94,0.3)",
              }}>👤</div>
              <div style={{ fontSize:"18px", fontWeight:700, color:"#FFF", marginBottom:"4px" }}>
                عبدالرحمن غنام
              </div>
              <div style={{ fontSize:"13px", color:"#C9A85E", marginBottom:"12px" }}>
                المالك والمستشار العقاري
              </div>
              <Divider style={{ marginBottom:"12px" }} />
              <div style={{ fontSize:"13px", color:"#888", lineHeight:1.7 }}>
                خبرة عقارية في المحلة الكبرى
                <br />منذ 2019
              </div>
              <div style={{ marginTop:"16px", display:"flex", gap:"8px", justifyContent:"center" }}>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} style={{
                  background:"#25D366", color:"#FFF",
                  padding:"8px 16px", borderRadius:"100px",
                  fontSize:"12px", fontWeight:600, textDecoration:"none",
                }}>📱 {PHONE_NUMBER}</a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEARCH ENGINE */}
      <section style={{ background:"#0F0F0F", padding:"0" }}>
        <Container>
          <div style={{
            background:"#222", border:"1px solid #2A2A2A",
            borderRadius:"20px", padding:"32px",
            marginTop:"-2px",
            boxShadow:"0 20px 60px rgba(0,0,0,0.5)",
          }}>
            <h2 style={{ fontSize:"20px", fontWeight:700, color:"#FFF",
              marginBottom:"24px", textAlign:"center" }}>
              🔍 ابحث عن عقارك المثالي
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"16px" }}>
              <Select label="نوع العقار" value={searchForm.type}
                onChange={e=>setSearchForm(p=>({...p,type:e.target.value}))}
                options={[
                  {value:"",label:"جميع الأنواع"},
                  {value:"APARTMENT",label:"شقة"},
                  {value:"VILLA",label:"فيلا"},
                  {value:"DUPLEX",label:"دوبلكس"},
                  {value:"COMMERCIAL",label:"محل تجاري"},
                  {value:"LAND",label:"أرض"},
                ]} />
              <Select label="الحي" value={searchForm.district}
                onChange={e=>setSearchForm(p=>({...p,district:e.target.value}))}
                options={[
                  {value:"",label:"جميع الأحياء"},
                  ...DISTRICTS.map(d=>({value:d.slug,label:d.nameAr}))
                ]} />
              <Select label="الغرض" value={searchForm.purpose}
                onChange={e=>setSearchForm(p=>({...p,purpose:e.target.value}))}
                options={[{value:"SALE",label:"للبيع"},{value:"RENT",label:"للإيجار"}]} />
              <Select label="غرف النوم" value={searchForm.beds}
                onChange={e=>setSearchForm(p=>({...p,beds:e.target.value}))}
                options={[
                  {value:"",label:"أي عدد"},
                  {value:"1",label:"1 غرفة"},
                  {value:"2",label:"2 غرفة"},
                  {value:"3",label:"3 غرف"},
                  {value:"4",label:"4+ غرف"},
                ]} />
            </div>
            <div style={{ marginTop:"20px", display:"flex", justifyContent:"center" }}>
              <Btn variant="primary" size="lg" onClick={()=>setPage("properties")}
                style={{ minWidth:"200px" }}>
                🔍 ابحث الآن
              </Btn>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST */}
      <section ref={setRef("trust")} id="trust"
        style={{ padding:"80px 0", background:"#0F0F0F" }}>
        <Container>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"24px" }}>
            {[
              { icon:"✅", title:"عقارات موثقة",   desc:"كل العقارات مؤكدة ومراجعة بدقة قبل النشر" },
              { icon:"🎯", title:"تركيز على المحلة",desc:"متخصصون في جميع أحياء المحلة الكبرى" },
              { icon:"🛡️", title:"أمان وموثوقية",  desc:"تعاملات شفافة وآمنة بضمان كامل" },
              { icon:"💡", title:"خبرة حقيقية",    desc:"سنوات من الخبرة في السوق المحلي" },
            ].map((t,i)=>(
              <div key={i} style={{
                background:"#222", border:"1px solid #2A2A2A",
                borderRadius:"16px", padding:"28px",
                textAlign:"center",
                opacity: visibleSections.has("trust") ? 1 : 0,
                transform: visibleSections.has("trust") ? "translateY(0)" : "translateY(24px)",
                transition:`all 0.5s ease ${i*0.1}s`,
              }}>
                <div style={{ fontSize:"36px", marginBottom:"16px" }}>{t.icon}</div>
                <h3 style={{ fontSize:"16px", fontWeight:600, color:"#FFF", marginBottom:"8px" }}>{t.title}</h3>
                <p style={{ fontSize:"13px", color:"#888", lineHeight:1.7 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED PROPERTIES */}
      <Section id="featured-props" ref={setRef("featured")} style={{ background:"#1A1A1A" }}>
        <Container>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"40px" }}>
            <SectionTitle title="⭐ عقارات مميزة" subtitle="أبرز العقارات المتاحة حالياً" style={{ marginBottom:0 }} />
            <Btn variant="outline" size="sm" onClick={()=>setPage("properties")}>
              عرض الكل ←
            </Btn>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"24px" }}>
            {featured.map((p,i) => (
              <div key={p.id} style={{
                opacity: visibleSections.has("featured") ? 1 : 0,
                transform: visibleSections.has("featured") ? "translateY(0)" : "translateY(24px)",
                transition:`all 0.5s ease ${i*0.12}s`,
              }}>
                <PropertyCard property={p}
                  onView={(prop)=>{ setSelectedProperty(prop); setPage("property-detail") }} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* DISTRICTS */}
      <Section id="home-districts" style={{ background:"#0F0F0F" }}>
        <Container>
          <SectionTitle title="🏙️ أهم الأحياء في المحلة" subtitle="تعرف على أفضل أحياء المحلة الكبرى وأسعارها" />
          <div className="scroll-x" style={{ padding:"8px 0 16px" }}>
            {DISTRICTS.map((d,i)=>(
              <div key={d.id} onClick={()=>setPage("districts")}
                style={{
                  minWidth:"200px", flex:"0 0 200px",
                  background:"#222", borderRadius:"16px",
                  overflow:"hidden", cursor:"pointer",
                  border:"1px solid #2A2A2A",
                  transition:"all 0.3s ease",
                }}
                onMouseEnter={e=>{
                  e.currentTarget.style.border="1px solid #C9A85E"
                  e.currentTarget.style.transform="translateY(-4px)"
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.border="1px solid #2A2A2A"
                  e.currentTarget.style.transform="translateY(0)"
                }}>
                <div style={{ height:"120px", position:"relative", overflow:"hidden" }}>
                  <img src={d.img} alt={d.nameAr} style={{
                    width:"100%", height:"100%", objectFit:"cover",
                  }} />
                  <div style={{
                    position:"absolute",inset:0,
                    background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)",
                  }} />
                </div>
                <div style={{ padding:"14px" }}>
                  <div style={{ fontSize:"15px",fontWeight:600,color:"#FFF",marginBottom:"4px" }}>{d.nameAr}</div>
                  <div style={{ fontSize:"12px",color:"#888" }}>{d.count} عقار متاح</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* STATS */}
      <section ref={setRef("stats")} id="stats"
        style={{ padding:"60px 0", background:"linear-gradient(135deg,#111,#1A1A1A)" }}>
        <Container>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"32px",
            textAlign:"center" }}>
            {[
              { num:"150+", label:"عقار تم بيعه", icon:"🏠" },
              { num:"5+",   label:"سنوات خبرة",   icon:"⭐" },
              { num:"300+", label:"عميل راضٍ",    icon:"😊" },
              { num:"98%",  label:"نسبة الرضا",   icon:"💯" },
            ].map((s,i)=>(
              <div key={i} style={{
                opacity: visibleSections.has("stats") ? 1 : 0,
                transform: visibleSections.has("stats") ? "translateY(0)" : "translateY(20px)",
                transition:`all 0.6s ease ${i*0.1}s`,
              }}>
                <div style={{ fontSize:"32px", marginBottom:"8px" }}>{s.icon}</div>
                <div style={{ fontSize:"40px", fontWeight:700, color:"#C9A85E", lineHeight:1 }}>{s.num}</div>
                <div style={{ fontSize:"14px", color:"#888", marginTop:"8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <Section style={{ background:"#1A1A1A" }}>
        <Container>
          <SectionTitle title="⚙️ كيف نعمل" subtitle="4 خطوات بسيطة للعثور على عقارك المثالي"
            centered />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"24px" }}>
            {[
              { step:"01", title:"أخبرنا عن احتياجك",    desc:"تواصل معنا واشرح ما تبحث عنه ومدى ميزانيتك", icon:"💬" },
              { step:"02", title:"نرشح لك أفضل الخيارات",desc:"بناءً على احتياجك نقدم لك أفضل العقارات المتاحة", icon:"🎯" },
              { step:"03", title:"نزور العقار معاً",     desc:"نرافقك في المعاينة ونجيب على جميع أسئلتك", icon:"🚶" },
              { step:"04", title:"نتم الصفقة بأمان",     desc:"دعم كامل حتى إتمام العقد وتسليم المفاتيح", icon:"🤝" },
            ].map((s,i)=>(
              <div key={i} style={{
                background:"#222", borderRadius:"16px", padding:"28px",
                position:"relative", overflow:"hidden",
                border:"1px solid #2A2A2A",
              }}>
                <div style={{ fontSize:"48px",fontWeight:900,color:"rgba(201,168,94,0.08)",
                  position:"absolute",top:"8px",left:"16px",lineHeight:1 }}>
                  {s.step}
                </div>
                <div style={{ fontSize:"36px",marginBottom:"16px" }}>{s.icon}</div>
                <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",marginBottom:"8px" }}>{s.title}</h3>
                <p style={{ fontSize:"13px",color:"#888",lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section style={{ background:"#0F0F0F" }}>
        <Container>
          <SectionTitle title="💬 آراء عملاؤنا" subtitle="ماذا يقول من تعاملوا معنا" centered />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"24px" }}>
            {TESTIMONIALS.map((t,i)=>(
              <div key={t.id} style={{
                background:"#222", borderRadius:"16px", padding:"28px",
                border:"1px solid #2A2A2A",
                position:"relative",
              }}>
                <div style={{ fontSize:"32px",color:"#C9A85E",marginBottom:"16px",opacity:0.6 }}>"</div>
                <p style={{ fontSize:"14px",color:"#BBB",lineHeight:1.8,marginBottom:"20px" }}>{t.content}</p>
                <Divider style={{ marginBottom:"16px" }} />
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:"14px",fontWeight:600,color:"#FFF" }}>{t.name}</div>
                    <div style={{ fontSize:"12px",color:"#888" }}>{t.location} • {t.type}</div>
                  </div>
                  <div style={{ fontSize:"14px",color:"#F59E0B" }}>{"⭐".repeat(t.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* BLOG PREVIEW */}
      <Section style={{ background:"#1A1A1A" }}>
        <Container>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"40px" }}>
            <SectionTitle title="📝 من مدونتنا" subtitle="نصائح وتحليلات سوق العقارات في المحلة"
              style={{ marginBottom:0 }} />
            <Btn variant="outline" size="sm" onClick={()=>setPage("blog")}>المدونة ←</Btn>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"24px" }}>
            {BLOG_POSTS.map(b=>(
              <div key={b.id} onClick={()=>setPage("blog")}
                style={{ background:"#222",borderRadius:"16px",overflow:"hidden",
                  cursor:"pointer",border:"1px solid #2A2A2A",transition:"all 0.3s" }}
                onMouseEnter={e=>{ e.currentTarget.style.border="1px solid #C9A85E";
                  e.currentTarget.style.transform="translateY(-4px)" }}
                onMouseLeave={e=>{ e.currentTarget.style.border="1px solid #2A2A2A";
                  e.currentTarget.style.transform="translateY(0)" }}>
                <img src={b.img} alt={b.titleAr} style={{
                  width:"100%",height:"180px",objectFit:"cover" }} />
                <div style={{ padding:"20px" }}>
                  <div style={{ fontSize:"12px",color:"#C9A85E",marginBottom:"8px",fontWeight:500 }}>
                    📅 {b.date}
                  </div>
                  <h3 style={{ fontSize:"15px",fontWeight:600,color:"#FFF",
                    lineHeight:1.5,marginBottom:"8px" }} className="clamp-2">
                    {b.titleAr}
                  </h3>
                  <p style={{ fontSize:"13px",color:"#888",lineHeight:1.7 }}
                     className="clamp-2">{b.excerpt}</p>
                  <div style={{ marginTop:"14px",fontSize:"13px",color:"#C9A85E",fontWeight:500 }}>
                    اقرأ المزيد ←
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section style={{
        padding:"80px 0",
        background:"linear-gradient(135deg,#0F0F0F 0%,#1A1308 50%,#0F0F0F 100%)",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute",top:"50%",left:"50%",
          transform:"translate(-50%,-50%)",
          width:"600px",height:"600px",borderRadius:"50%",
          background:"radial-gradient(circle,rgba(201,168,94,0.05),transparent 70%)",
          pointerEvents:"none",
        }} />
        <Container style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:"clamp(24px,4vw,40px)",fontWeight:700,color:"#FFF",
            marginBottom:"16px" }}>
            هل أنت مستعد للعثور على عقار أحلامك؟
          </h2>
          <p style={{ fontSize:"16px",color:"#888",lineHeight:1.8,maxWidth:"560px",
            margin:"0 auto 36px" }}>
            تواصل معنا الآن وسنساعدك في اتخاذ القرار الصحيح. استشارة مجانية بدون أي التزام.
          </p>
          <div style={{ display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap" }}>
            <Btn variant="whatsapp" size="lg"
              href={buildWhatsAppUrl("مرحبا، أريد استشارة مجانية")}
              style={{ minWidth:"200px" }}>
              📱 واتساب: {PHONE_NUMBER}
            </Btn>
            <Btn variant="outline" size="lg" onClick={()=>setPage("contact")}
              style={{ minWidth:"160px" }}>
              📞 تواصل معنا
            </Btn>
          </div>
        </Container>
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// PROPERTIES PAGE
// ═══════════════════════════════════════════════════════════

const PropertiesPage = ({ setPage, setSelectedProperty }) => {
  const [filters, setFilters] = useState({ type:"", district:"", purpose:"", beds:"" })
  const [sort, setSort] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = PROPERTIES.filter(p => {
    if (filters.type && p.type !== filters.type) return false
    if (filters.district && p.district.slug !== filters.district) return false
    if (filters.purpose && p.purpose !== filters.purpose) return false
    if (filters.beds && p.bedrooms < parseInt(filters.beds)) return false
    return true
  }).sort((a,b)=>{
    if (sort==="price_asc")  return a.price - b.price
    if (sort==="price_desc") return b.price - a.price
    if (sort==="area_desc")  return b.area - a.area
    return b.id.localeCompare(a.id)
  })

  const FilterPanel = () => (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
      <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF" }}>🔧 الفلترة</h3>
      <Select label="نوع العقار" value={filters.type}
        onChange={e=>setFilters(p=>({...p,type:e.target.value}))}
        options={[{value:"",label:"الكل"},{value:"APARTMENT",label:"شقة"},
          {value:"VILLA",label:"فيلا"},{value:"DUPLEX",label:"دوبلكس"},
          {value:"COMMERCIAL",label:"تجاري"},{value:"LAND",label:"أرض"}]} />
      <Select label="الغرض" value={filters.purpose}
        onChange={e=>setFilters(p=>({...p,purpose:e.target.value}))}
        options={[{value:"",label:"الكل"},{value:"SALE",label:"للبيع"},{value:"RENT",label:"للإيجار"}]} />
      <Select label="الحي" value={filters.district}
        onChange={e=>setFilters(p=>({...p,district:e.target.value}))}
        options={[{value:"",label:"جميع الأحياء"},...DISTRICTS.map(d=>({value:d.slug,label:d.nameAr}))]} />
      <Select label="غرف النوم" value={filters.beds}
        onChange={e=>setFilters(p=>({...p,beds:e.target.value}))}
        options={[{value:"",label:"أي عدد"},{value:"1",label:"1+"},{value:"2",label:"2+"},
          {value:"3",label:"3+"},{value:"4",label:"4+"}]} />
      <Btn variant="danger" size="sm" onClick={()=>setFilters({type:"",district:"",purpose:"",beds:""})}>
        إعادة تعيين
      </Btn>
    </div>
  )

  return (
    <div style={{ paddingTop:"72px", minHeight:"100vh" }}>
      {/* Page Header */}
      <div style={{ background:"#0F0F0F", padding:"40px 0", borderBottom:"1px solid #2A2A2A" }}>
        <Container>
          <div style={{ fontSize:"13px",color:"#666",marginBottom:"8px" }}>
            الرئيسية &gt; العقارات
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"16px" }}>
            <div>
              <h1 style={{ fontSize:"32px",fontWeight:700,color:"#FFF",marginBottom:"8px" }}>جميع العقارات</h1>
              <p style={{ fontSize:"14px",color:"#888" }}>
                وجدنا <span style={{ color:"#C9A85E",fontWeight:600 }}>{filtered.length}</span> عقار متاح
              </p>
            </div>
            <div style={{ display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap" }}>
              <Btn variant="ghost" size="sm" onClick={()=>setShowFilters(!showFilters)}
                style={{ display:"flex" }}>
                🔧 الفلترة {showFilters ? "▲":"▼"}
              </Btn>
              <Select value={sort} onChange={e=>setSort(e.target.value)}
                options={[{value:"newest",label:"الأحدث"},{value:"price_asc",label:"السعر: الأقل"},
                  {value:"price_desc",label:"السعر: الأعلى"},{value:"area_desc",label:"المساحة: الأكبر"}]}
                style={{ minWidth:"160px" }} />
            </div>
          </div>

          {/* Inline Filters */}
          {showFilters && (
            <div style={{ marginTop:"24px", padding:"24px",
              background:"#222",borderRadius:"16px",border:"1px solid #2A2A2A",
              display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"16px" }}>
              <FilterPanel />
            </div>
          )}
        </Container>
      </div>

      {/* Grid */}
      <div style={{ background:"#1A1A1A", padding:"40px 0" }}>
        <Container>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center",padding:"80px 0" }}>
              <div style={{ fontSize:"48px",marginBottom:"16px" }}>🔍</div>
              <h3 style={{ fontSize:"20px",fontWeight:600,color:"#FFF",marginBottom:"8px" }}>لا توجد نتائج</h3>
              <p style={{ fontSize:"14px",color:"#888",marginBottom:"24px" }}>حاول تغيير معايير البحث</p>
              <Btn variant="primary" onClick={()=>setFilters({type:"",district:"",purpose:"",beds:""})}>
                مسح الفلترة
              </Btn>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"24px" }}>
              {filtered.map(p => (
                <PropertyCard key={p.id} property={p}
                  onView={(prop)=>{ setSelectedProperty(prop); setPage("property-detail") }} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// PROPERTY DETAIL PAGE
// ═══════════════════════════════════════════════════════════

const PropertyDetailPage = ({ property, setPage, setSelectedProperty }) => {
  const [activeImg, setActiveImg] = useState(0)
  const [inquiryForm, setInquiryForm] = useState({ name:"", phone:"", message:"" })
  const [submitted, setSubmitted] = useState(false)
  const [calcForm, setCalcForm] = useState({ deposit:20, years:10, rate:14 })

  if (!property) { setPage("properties"); return null }

  const related = PROPERTIES.filter(p => p.id !== property.id && p.district.slug === property.district.slug).slice(0,3)

  // Mortgage calc
  const loanAmt = property.price * (1 - calcForm.deposit/100)
  const monthlyRate = calcForm.rate / 100 / 12
  const numPayments = calcForm.years * 12
  const monthly = loanAmt * (monthlyRate * Math.pow(1+monthlyRate,numPayments)) /
                  (Math.pow(1+monthlyRate,numPayments) - 1)

  const handleSubmit = () => {
    if (!inquiryForm.name || !inquiryForm.phone) return
    setSubmitted(true)
  }

  return (
    <div style={{ paddingTop:"72px", minHeight:"100vh", background:"#1A1A1A" }}>
      {/* Breadcrumb */}
      <div style={{ background:"#0F0F0F", padding:"16px 0", borderBottom:"1px solid #2A2A2A" }}>
        <Container>
          <div style={{ fontSize:"13px",color:"#666" }}>
            <button onClick={()=>setPage("home")} style={{ background:"none",border:"none",
              color:"#888",cursor:"pointer",fontFamily:"Cairo,sans-serif",fontSize:"13px" }}>الرئيسية</button>
            {" > "}
            <button onClick={()=>setPage("properties")} style={{ background:"none",border:"none",
              color:"#888",cursor:"pointer",fontFamily:"Cairo,sans-serif",fontSize:"13px" }}>العقارات</button>
            {" > "}
            <span style={{ color:"#C9A85E" }} className="clamp-1">{property.titleAr}</span>
          </div>
        </Container>
      </div>

      <Container style={{ padding:"32px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"32px", alignItems:"start" }}>

          {/* LEFT: Main content */}
          <div>
            {/* Gallery */}
            <div style={{ borderRadius:"20px",overflow:"hidden",marginBottom:"24px",
              border:"1px solid #2A2A2A" }}>
              <div style={{ position:"relative",height:"420px" }}>
                <img src={property.images[activeImg]?.url} alt={property.titleAr}
                  style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                <div style={{ position:"absolute",top:"16px",right:"16px",display:"flex",gap:"8px" }}>
                  {property.verified && <Badge variant="verified">✓ موثق</Badge>}
                  {property.featured && <Badge variant="featured">⭐ مميز</Badge>}
                </div>
                <div style={{ position:"absolute",top:"16px",left:"16px" }}>
                  <Badge variant={property.purpose==="RENT"?"rent":"sale"}>
                    {purposeAr[property.purpose]}
                  </Badge>
                </div>
                <div style={{ position:"absolute",bottom:"16px",left:"16px",
                  background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",
                  borderRadius:"8px",padding:"6px 12px",fontSize:"12px",color:"#FFF" }}>
                  👁 {property.viewCount} مشاهدة
                </div>
              </div>
            </div>

            {/* Title & Price */}
            <div style={{ marginBottom:"24px" }}>
              <div style={{ fontSize:"13px",color:"#888",marginBottom:"8px" }}>
                كود: {property.referenceCode} • {propertyTypeAr[property.type]}
              </div>
              <h1 style={{ fontSize:"26px",fontWeight:700,color:"#FFF",
                marginBottom:"12px",lineHeight:1.3 }}>
                {property.titleAr}
              </h1>
              <div style={{ display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap" }}>
                <div style={{ fontSize:"32px",fontWeight:700,color:"#C9A85E" }}>
                  {formatPrice(property.price, property.purpose)}
                </div>
                {property.negotiable && (
                  <Badge variant="default" style={{ background:"rgba(245,158,11,0.1)",
                    color:"#F59E0B",border:"1px solid rgba(245,158,11,0.3)" }}>
                    قابل للتفاوض
                  </Badge>
                )}
              </div>
              {property.area > 0 && (
                <div style={{ fontSize:"13px",color:"#888",marginTop:"6px" }}>
                  سعر المتر: {Math.round(property.price/property.area).toLocaleString("ar-EG")} ج.م/م²
                </div>
              )}
            </div>

            {/* Location */}
            <div style={{ display:"flex",alignItems:"center",gap:"8px",
              marginBottom:"24px",padding:"14px 16px",
              background:"#222",borderRadius:"12px",border:"1px solid #2A2A2A" }}>
              <span>📍</span>
              <span style={{ fontSize:"14px",color:"#BBB" }}>
                {property.addressAr || `${property.district.nameAr}، المحلة الكبرى، محافظة الغربية`}
              </span>
            </div>

            {/* Stats */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",
              gap:"12px",marginBottom:"24px" }}>
              {[
                { icon:"🛏", label:"غرف النوم",  val:property.bedrooms },
                { icon:"🚿", label:"الحمامات",   val:property.bathrooms },
                { icon:"📐", label:"المساحة",    val:formatArea(property.area) },
                { icon:"🏢", label:"الطابق",     val:property.floor ? `الطابق ${property.floor}` : "—" },
                { icon:"🪑", label:"الفرش",      val:property.furnished==="FURNISHED"?"مفروش":property.furnished==="SEMI_FURNISHED"?"نصف مفروش":"غير مفروش" },
              ].map((s,i)=>(
                <div key={i} style={{ background:"#222",borderRadius:"12px",
                  padding:"14px",textAlign:"center",border:"1px solid #2A2A2A" }}>
                  <div style={{ fontSize:"22px",marginBottom:"6px" }}>{s.icon}</div>
                  <div style={{ fontSize:"11px",color:"#666",marginBottom:"4px" }}>{s.label}</div>
                  <div style={{ fontSize:"14px",fontWeight:600,color:"#FFF" }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ background:"#222",borderRadius:"16px",padding:"24px",
              marginBottom:"24px",border:"1px solid #2A2A2A" }}>
              <h2 style={{ fontSize:"18px",fontWeight:600,color:"#FFF",marginBottom:"16px" }}>
                📋 وصف العقار
              </h2>
              <p style={{ fontSize:"14px",color:"#BBB",lineHeight:1.9 }}>
                {property.descriptionAr}
                <br /><br />
                العقار يقع في موقع متميز بالمحلة الكبرى، سهل الوصول إليه من جميع المناطق.
                المبنى حديث البناء، تشطيب ممتاز، جميع الغرف واسعة ومضاءة بشكل جيد.
                قريب من المدارس والمستشفيات ومراكز التسوق. فرصة استثمارية لا تعوّض.
              </p>
            </div>

            {/* Features */}
            <div style={{ background:"#222",borderRadius:"16px",padding:"24px",
              marginBottom:"24px",border:"1px solid #2A2A2A" }}>
              <h2 style={{ fontSize:"18px",fontWeight:600,color:"#FFF",marginBottom:"16px" }}>
                ✨ المميزات والخصائص
              </h2>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"10px" }}>
                {FEATURES_LIST.map((f,i)=>(
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:"8px",
                    background:"rgba(201,168,94,0.05)",borderRadius:"8px",
                    padding:"10px 12px",border:"1px solid rgba(201,168,94,0.15)" }}>
                    <span style={{ fontSize:"18px" }}>{f.icon}</span>
                    <span style={{ fontSize:"13px",color:"#BBB",fontWeight:500 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div style={{ background:"#222",borderRadius:"16px",
              marginBottom:"24px",border:"1px solid #2A2A2A",overflow:"hidden" }}>
              <div style={{ padding:"16px 24px",borderBottom:"1px solid #2A2A2A" }}>
                <h2 style={{ fontSize:"18px",fontWeight:600,color:"#FFF" }}>🗺️ الموقع على الخريطة</h2>
              </div>
              <div style={{ height:"240px",background:"#1A1A1A",display:"flex",
                alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"12px" }}>
                <div style={{ fontSize:"40px" }}>🗺️</div>
                <p style={{ color:"#666",fontSize:"14px" }}>المحلة الكبرى، محافظة الغربية</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                  style={{ color:"#C9A85E",fontSize:"13px",fontWeight:500 }}>
                  افتح في خرائط جوجل ←
                </a>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <div style={{ background:"#222",borderRadius:"16px",padding:"24px",
              marginBottom:"24px",border:"1px solid #2A2A2A" }}>
              <h2 style={{ fontSize:"18px",fontWeight:600,color:"#FFF",marginBottom:"20px" }}>
                🧮 حاسبة القرض العقاري
              </h2>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"16px",marginBottom:"20px" }}>
                <div>
                  <label style={{ fontSize:"13px",color:"#888",display:"block",marginBottom:"8px" }}>
                    المقدم: {calcForm.deposit}%
                  </label>
                  <input type="range" min={10} max={50} value={calcForm.deposit}
                    onChange={e=>setCalcForm(p=>({...p,deposit:+e.target.value}))}
                    style={{ width:"100%",accentColor:"#C9A85E" }} />
                </div>
                <div>
                  <label style={{ fontSize:"13px",color:"#888",display:"block",marginBottom:"8px" }}>
                    المدة: {calcForm.years} سنة
                  </label>
                  <input type="range" min={5} max={25} value={calcForm.years}
                    onChange={e=>setCalcForm(p=>({...p,years:+e.target.value}))}
                    style={{ width:"100%",accentColor:"#C9A85E" }} />
                </div>
                <div>
                  <label style={{ fontSize:"13px",color:"#888",display:"block",marginBottom:"8px" }}>
                    الفائدة: {calcForm.rate}%
                  </label>
                  <input type="range" min={8} max={25} value={calcForm.rate}
                    onChange={e=>setCalcForm(p=>({...p,rate:+e.target.value}))}
                    style={{ width:"100%",accentColor:"#C9A85E" }} />
                </div>
              </div>
              <div style={{ background:"rgba(201,168,94,0.08)",borderRadius:"12px",
                padding:"20px",border:"1px solid rgba(201,168,94,0.2)",textAlign:"center" }}>
                <div style={{ fontSize:"13px",color:"#888",marginBottom:"8px" }}>القسط الشهري المتوقع</div>
                <div style={{ fontSize:"32px",fontWeight:700,color:"#C9A85E" }}>
                  {isNaN(monthly) ? "—" : Math.round(monthly).toLocaleString("ar-EG")} ج.م
                </div>
                <div style={{ fontSize:"12px",color:"#666",marginTop:"8px" }}>
                  قرض: {Math.round(loanAmt).toLocaleString("ar-EG")} ج.م •
                  إجمالي: {Math.round(monthly*numPayments).toLocaleString("ar-EG")} ج.م
                </div>
              </div>
            </div>

            {/* Related Properties */}
            {related.length > 0 && (
              <div>
                <h2 style={{ fontSize:"20px",fontWeight:600,color:"#FFF",marginBottom:"20px" }}>
                  🏠 عقارات مشابهة في {property.district.nameAr}
                </h2>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"20px" }}>
                  {related.map(p=>(
                    <PropertyCard key={p.id} property={p}
                      onView={(prop)=>{ setSelectedProperty(prop); window.scrollTo(0,0) }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Contact Sidebar */}
          <div style={{ position:"sticky",top:"88px" }}>
            <div style={{ background:"#222",borderRadius:"20px",padding:"24px",
              border:"1px solid #2A2A2A",
              boxShadow:"0 8px 40px rgba(0,0,0,0.4)" }}>

              <div style={{ fontSize:"28px",fontWeight:700,color:"#C9A85E",
                marginBottom:"4px",fontVariantNumeric:"tabular-nums" }}>
                {formatPrice(property.price, property.purpose)}
              </div>
              <div style={{ fontSize:"13px",color:"#888",marginBottom:"20px" }}>
                {property.negotiable ? "✅ السعر قابل للتفاوض" : "السعر ثابت"}
              </div>

              <div style={{ fontSize:"13px",color:"#666",marginBottom:"20px",
                padding:"10px 14px",background:"#2A2A2A",borderRadius:"8px" }}>
                👁 تمت مشاهدة هذا العقار {property.viewCount} مرة
              </div>

              <div style={{ display:"flex",flexDirection:"column",gap:"12px",marginBottom:"24px" }}>
                <Btn variant="whatsapp" size="lg"
                  href={buildWhatsAppUrl(`مرحبا، أريد الاستفسار عن ${property.titleAr} (${property.referenceCode})`)}>
                  📱 تواصل عبر واتساب
                </Btn>
                <Btn variant="outline" size="lg" href={`tel:+${WHATSAPP_NUMBER}`}>
                  📞 اتصل بنا
                </Btn>
              </div>

              <Divider style={{ marginBottom:"20px" }} />

              {/* Inquiry Form */}
              {!submitted ? (
                <div>
                  <h3 style={{ fontSize:"15px",fontWeight:600,color:"#FFF",marginBottom:"16px" }}>
                    📩 أرسل استفساراً
                  </h3>
                  <div style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
                    <Input label="الاسم *" placeholder="اسمك الكريم"
                      value={inquiryForm.name}
                      onChange={e=>setInquiryForm(p=>({...p,name:e.target.value}))} />
                    <Input label="رقم الهاتف *" placeholder="01xxxxxxxxx"
                      value={inquiryForm.phone} type="tel"
                      onChange={e=>setInquiryForm(p=>({...p,phone:e.target.value}))} />
                    <div>
                      <label style={{ fontSize:"13px",color:"#B3B3B3",display:"block",marginBottom:"6px" }}>
                        رسالة (اختياري)
                      </label>
                      <textarea
                        placeholder="اكتب استفسارك هنا..."
                        value={inquiryForm.message}
                        onChange={e=>setInquiryForm(p=>({...p,message:e.target.value}))}
                        style={{
                          background:"#2A2A2A",border:"1px solid #444",
                          borderRadius:"12px",padding:"12px 16px",fontSize:"14px",
                          color:"#FFF",width:"100%",height:"80px",resize:"none",
                          fontFamily:"Cairo,sans-serif",outline:"none",direction:"rtl",
                        }}
                        onFocus={e=>e.target.style.borderColor="#C9A85E"}
                        onBlur={e=>e.target.style.borderColor="#444"} />
                    </div>
                    <Btn variant="primary" onClick={handleSubmit}
                      disabled={!inquiryForm.name || !inquiryForm.phone}>
                      إرسال الاستفسار
                    </Btn>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign:"center",padding:"20px" }}>
                  <div style={{ fontSize:"48px",marginBottom:"12px" }}>✅</div>
                  <h3 style={{ fontSize:"16px",fontWeight:600,color:"#22C55E",marginBottom:"8px" }}>
                    تم إرسال استفسارك!
                  </h3>
                  <p style={{ fontSize:"13px",color:"#888" }}>
                    سيتواصل معك عبدالرحمن قريباً. يمكنك أيضاً التواصل مباشرة عبر واتساب.
                  </p>
                </div>
              )}

              <Divider style={{ margin:"20px 0" }} />
              <div style={{ fontSize:"12px",color:"#555",textAlign:"center" }}>
                🔒 بياناتك محمية وآمنة لدينا تماماً
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile sticky bar */}
      <div style={{
        position:"fixed",bottom:0,right:0,left:0,zIndex:90,
        background:"rgba(15,15,15,0.97)",backdropFilter:"blur(20px)",
        borderTop:"1px solid #2A2A2A",padding:"12px 20px",
        display:"flex",gap:"12px",alignItems:"center",
      }}>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ fontSize:"16px",fontWeight:700,color:"#C9A85E" }}>
            {formatPrice(property.price, property.purpose)}
          </div>
          <div style={{ fontSize:"12px",color:"#888" }} className="clamp-1">{property.titleAr}</div>
        </div>
        <Btn variant="whatsapp" size="md"
          href={buildWhatsAppUrl(`أريد الاستفسار عن ${property.referenceCode}`)}>
          📱 واتساب
        </Btn>
        <Btn variant="outline" size="md" href={`tel:+${WHATSAPP_NUMBER}`}>📞</Btn>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// DISTRICTS PAGE
// ═══════════════════════════════════════════════════════════

const DistrictsPage = ({ setPage, setSelectedProperty }) => (
  <div style={{ paddingTop:"72px", minHeight:"100vh", background:"#1A1A1A" }}>
    <div style={{ background:"linear-gradient(135deg,#0F0F0F,#1A1A1A)",
      padding:"60px 0", borderBottom:"1px solid #2A2A2A" }}>
      <Container style={{ textAlign:"center" }}>
        <h1 style={{ fontSize:"40px",fontWeight:700,color:"#FFF",marginBottom:"16px" }}>
          🏙️ أحياء المحلة الكبرى
        </h1>
        <p style={{ fontSize:"16px",color:"#888",maxWidth:"560px",margin:"0 auto" }}>
          تعرف على أبرز الأحياء في المحلة الكبرى وأسعار العقارات في كل حي
        </p>
      </Container>
    </div>

    <Section>
      <Container>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"28px" }}>
          {DISTRICTS.map((d,i)=>{
            const districtProps = PROPERTIES.filter(p=>p.district.slug===d.slug)
            return (
              <div key={d.id} style={{
                background:"#222",borderRadius:"20px",overflow:"hidden",
                border:"1px solid #2A2A2A",cursor:"pointer",
                transition:"all 0.3s ease",
                animation:`fadeUp 0.5s ease ${i*0.1}s both`,
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.border="1px solid #C9A85E"
                e.currentTarget.style.transform="translateY(-6px)"
                e.currentTarget.style.boxShadow="0 12px 40px rgba(201,168,94,0.2)"
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.border="1px solid #2A2A2A"
                e.currentTarget.style.transform="translateY(0)"
                e.currentTarget.style.boxShadow="none"
              }}>
                <div style={{ position:"relative",height:"200px" }}>
                  <img src={d.img} alt={d.nameAr}
                    style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  <div style={{ position:"absolute",inset:0,
                    background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)" }} />
                  <div style={{ position:"absolute",bottom:"16px",right:"16px" }}>
                    <h2 style={{ fontSize:"22px",fontWeight:700,color:"#FFF" }}>{d.nameAr}</h2>
                    <p style={{ fontSize:"13px",color:"#BBB" }}>المحلة الكبرى، الغربية</p>
                  </div>
                  <div style={{ position:"absolute",top:"16px",left:"16px" }}>
                    <Badge variant="sale">{d.count} عقار</Badge>
                  </div>
                </div>

                <div style={{ padding:"20px" }}>
                  {/* Price Range */}
                  <div style={{ background:"rgba(201,168,94,0.06)",borderRadius:"12px",
                    padding:"14px 16px",marginBottom:"16px",
                    border:"1px solid rgba(201,168,94,0.12)" }}>
                    <div style={{ fontSize:"12px",color:"#888",marginBottom:"6px" }}>نطاق الأسعار</div>
                    <div style={{ fontSize:"16px",fontWeight:600,color:"#C9A85E" }}>
                      {formatPrice(d.avgMin)} — {formatPrice(d.avgMax)}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div style={{ display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"20px" }}>
                    {["مدارس قريبة","مستشفيات","مواصلات","أسواق"].map((h,j)=>(
                      <span key={j} style={{
                        fontSize:"12px",color:"#888",
                        background:"#2A2A2A",borderRadius:"100px",
                        padding:"4px 10px",border:"1px solid #333" }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px" }}>
                    <Btn variant="primary" size="sm" onClick={()=>setPage("properties")}>
                      عرض العقارات ({districtProps.length})
                    </Btn>
                    <Btn variant="whatsapp" size="sm"
                      href={buildWhatsAppUrl(`أريد عقاراً في ${d.nameAr}`)}>
                      📱 استفسار
                    </Btn>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  </div>
)

// ═══════════════════════════════════════════════════════════
// BLOG PAGE
// ═══════════════════════════════════════════════════════════

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const cats = [
    { value:"all",       label:"الكل" },
    { value:"buying-guide", label:"دليل الشراء" },
    { value:"investment",   label:"الاستثمار" },
    { value:"market-news",  label:"أسعار السوق" },
    { value:"districts",    label:"الأحياء" },
  ]

  const filtered = activeCategory === "all" ? BLOG_POSTS
    : BLOG_POSTS.filter(b => b.category === activeCategory)

  return (
    <div style={{ paddingTop:"72px", minHeight:"100vh", background:"#1A1A1A" }}>
      <div style={{ background:"#0F0F0F",padding:"60px 0",borderBottom:"1px solid #2A2A2A" }}>
        <Container style={{ textAlign:"center" }}>
          <h1 style={{ fontSize:"40px",fontWeight:700,color:"#FFF",marginBottom:"12px" }}>
            📝 مدونة غنام للعقارات
          </h1>
          <p style={{ fontSize:"16px",color:"#888" }}>
            نصائح وتحليلات وأخبار سوق العقارات في المحلة الكبرى
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Category filter */}
          <div style={{ display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"40px",justifyContent:"center" }}>
            {cats.map(c=>(
              <button key={c.value} onClick={()=>setActiveCategory(c.value)} style={{
                background: activeCategory===c.value ? "linear-gradient(135deg,#C9A85E,#A8863A)" : "#222",
                color: activeCategory===c.value ? "#0F0F0F" : "#888",
                border:`1px solid ${activeCategory===c.value ? "#C9A85E" : "#333"}`,
                borderRadius:"100px",padding:"8px 18px",fontSize:"13px",fontWeight:600,
                cursor:"pointer",fontFamily:"Cairo,sans-serif",transition:"all 0.2s",
              }}>
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"28px" }}>
            {filtered.map((b,i)=>(
              <article key={b.id} style={{
                background:"#222",borderRadius:"16px",overflow:"hidden",
                border:"1px solid #2A2A2A",cursor:"pointer",
                animation:`fadeUp 0.5s ease ${i*0.1}s both`,
                transition:"all 0.3s",
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.transform="translateY(-4px)"
                e.currentTarget.style.border="1px solid #C9A85E"
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.transform="translateY(0)"
                e.currentTarget.style.border="1px solid #2A2A2A"
              }}>
                <img src={b.img} alt={b.titleAr}
                  style={{ width:"100%",height:"200px",objectFit:"cover",display:"block" }} />
                <div style={{ padding:"24px" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"12px" }}>
                    <Badge variant="default" style={{ fontSize:"11px" }}>
                      {cats.find(c=>c.value===b.category)?.label || b.category}
                    </Badge>
                    <span style={{ fontSize:"12px",color:"#666" }}>📅 {b.date}</span>
                  </div>
                  <h2 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",
                    lineHeight:1.5,marginBottom:"10px" }} className="clamp-2">
                    {b.titleAr}
                  </h2>
                  <p style={{ fontSize:"13px",color:"#888",lineHeight:1.7,marginBottom:"16px" }}
                     className="clamp-2">
                    {b.excerpt}
                  </p>
                  <div style={{ fontSize:"13px",color:"#C9A85E",fontWeight:500 }}>اقرأ المزيد ←</div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section style={{ background:"#0F0F0F",padding:"60px 0" }}>
        <Container style={{ textAlign:"center" }}>
          <h2 style={{ fontSize:"28px",fontWeight:700,color:"#FFF",marginBottom:"12px" }}>
            هل لديك سؤال حول سوق العقارات؟
          </h2>
          <p style={{ fontSize:"15px",color:"#888",marginBottom:"24px" }}>
            تواصل معنا مباشرة للحصول على استشارة مجانية
          </p>
          <Btn variant="whatsapp" size="lg"
            href={buildWhatsAppUrl("مرحبا، لدي استفسار حول العقارات في المحلة")}>
            📱 استشارة مجانية عبر واتساب
          </Btn>
        </Container>
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════

const AboutPage = () => (
  <div style={{ paddingTop:"72px", minHeight:"100vh", background:"#1A1A1A" }}>
    {/* Hero */}
    <div style={{
      background:"linear-gradient(135deg,#0F0F0F,#1A1308)",
      padding:"80px 0",
      borderBottom:"1px solid #2A2A2A",
      position:"relative",overflow:"hidden",
    }}>
      <div style={{
        position:"absolute",top:"50%",right:"10%",
        transform:"translateY(-50%)",
        width:"400px",height:"400px",borderRadius:"50%",
        background:"radial-gradient(circle,rgba(201,168,94,0.06),transparent 70%)",
      }} />
      <Container>
        <div style={{ display:"grid",gridTemplateColumns:"1fr auto",gap:"48px",alignItems:"center" }}>
          <div>
            <Badge variant="sale" style={{ marginBottom:"20px" }}>عن غنام للعقارات</Badge>
            <h1 style={{ fontSize:"clamp(28px,4vw,48px)",fontWeight:700,color:"#FFF",
              lineHeight:1.2,marginBottom:"20px" }}>
              خبرة حقيقية في السوق العقاري
              <br /><span className="gold-text">بالمحلة الكبرى</span>
            </h1>
            <p style={{ fontSize:"16px",color:"#B3B3B3",lineHeight:1.9,maxWidth:"560px" }}>
              غنام للعقارات شركة متخصصة في بيع وتأجير العقارات في المحلة الكبرى.
              نؤمن بأن كل عميل يستحق خدمة مخصصة قائمة على الشفافية والثقة.
            </p>
          </div>
          <div style={{
            background:"rgba(201,168,94,0.06)",border:"1px solid rgba(201,168,94,0.2)",
            borderRadius:"20px",padding:"32px",textAlign:"center",minWidth:"200px",
          }}>
            <div style={{ width:"100px",height:"100px",borderRadius:"50%",
              margin:"0 auto 16px",
              background:"linear-gradient(135deg,#C9A85E,#A8863A)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:"40px",
              boxShadow:"0 0 40px rgba(201,168,94,0.3)" }}>👤</div>
            <div style={{ fontSize:"20px",fontWeight:700,color:"#FFF",marginBottom:"4px" }}>عبدالرحمن غنام</div>
            <div style={{ fontSize:"13px",color:"#C9A85E",marginBottom:"16px" }}>المؤسس والمستشار العقاري</div>
            <Btn variant="whatsapp" size="sm"
              href={buildWhatsAppUrl("مرحبا عبدالرحمن، أريد التحدث معك")}>
              📱 تواصل معي
            </Btn>
          </div>
        </div>
      </Container>
    </div>

    <Section>
      <Container>
        {/* Stats */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
          gap:"24px",marginBottom:"60px" }}>
          {[
            { num:"150+", label:"عقار تم بيعه",  icon:"🏠" },
            { num:"5+",   label:"سنوات خبرة",    icon:"📅" },
            { num:"300+", label:"عميل راضٍ",     icon:"😊" },
            { num:"5",    label:"أحياء نغطيها",  icon:"🏙️" },
          ].map((s,i)=>(
            <div key={i} style={{
              background:"#222",borderRadius:"16px",padding:"28px",
              textAlign:"center",border:"1px solid #2A2A2A",
            }}>
              <div style={{ fontSize:"32px",marginBottom:"8px" }}>{s.icon}</div>
              <div style={{ fontSize:"36px",fontWeight:700,color:"#C9A85E" }}>{s.num}</div>
              <div style={{ fontSize:"13px",color:"#888",marginTop:"8px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <SectionTitle title="قيمنا" subtitle="المبادئ التي تحكم كل تعامل نقوم به" />
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"24px" }}>
          {[
            { icon:"🛡️", title:"الأمانة والمصداقية",
              desc:"كل معلومة نقدمها دقيقة وموثوقة. لن نبيع لك عقاراً لا يناسبك." },
            { icon:"🔍", title:"الشفافية التامة",
              desc:"الأسعار واضحة، لا تكاليف خفية، لا مفاجآت غير سارة." },
            { icon:"🎯", title:"الخبرة المحلية",
              desc:"نعيش في المحلة ونعرفها بشكل عميق. هذا ليس مجرد عمل، هذه مدينتنا." },
            { icon:"🤝", title:"الدعم المستمر",
              desc:"نرافقك من أول استفسار حتى استلام المفتاح وما بعده." },
          ].map((v,i)=>(
            <div key={i} style={{ background:"#222",borderRadius:"16px",padding:"28px",
              border:"1px solid #2A2A2A" }}>
              <div style={{ fontSize:"36px",marginBottom:"16px" }}>{v.icon}</div>
              <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",marginBottom:"10px" }}>{v.title}</h3>
              <p style={{ fontSize:"13px",color:"#888",lineHeight:1.8 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  </div>
)

// ═══════════════════════════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════════════════════════

const ContactPage = () => {
  const [form, setForm] = useState({ name:"", phone:"", message:"" })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div style={{ paddingTop:"72px", minHeight:"100vh", background:"#1A1A1A" }}>
      <div style={{ background:"#0F0F0F",padding:"60px 0",borderBottom:"1px solid #2A2A2A" }}>
        <Container style={{ textAlign:"center" }}>
          <h1 style={{ fontSize:"40px",fontWeight:700,color:"#FFF",marginBottom:"12px" }}>
            📞 تواصل معنا
          </h1>
          <p style={{ fontSize:"16px",color:"#888" }}>
            نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px" }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize:"24px",fontWeight:700,color:"#FFF",marginBottom:"24px" }}>
                طرق التواصل
              </h2>

              {[
                { icon:"📱", title:"واتساب (الأسرع)", val:PHONE_NUMBER,
                  desc:"متاح طوال اليوم",
                  href:buildWhatsAppUrl("مرحبا، أريد استشارة عقارية"),
                  color:"#25D366" },
                { icon:"📞", title:"اتصال مباشر", val:PHONE_NUMBER,
                  desc:"من 9 صباحاً حتى 9 مساءً",
                  href:`tel:+${WHATSAPP_NUMBER}`,
                  color:"#C9A85E" },
                { icon:"📍", title:"العنوان", val:"المحلة الكبرى، محافظة الغربية، مصر",
                  desc:"نخدم جميع أحياء المحلة الكبرى",
                  color:"#888" },
              ].map((c,i)=>(
                <div key={i} style={{ display:"flex",gap:"16px",alignItems:"flex-start",
                  padding:"20px",background:"#222",borderRadius:"16px",
                  marginBottom:"16px",border:"1px solid #2A2A2A" }}>
                  <div style={{
                    width:"44px",height:"44px",borderRadius:"12px",flexShrink:0,
                    background:`rgba(${c.color==="#25D366"?"37,211,102":c.color==="#C9A85E"?"201,168,94":"136,136,136"},0.1)`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"22px",
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:"14px",fontWeight:600,color:"#FFF",marginBottom:"4px" }}>
                      {c.title}
                    </div>
                    {c.href
                      ? <a href={c.href} style={{ fontSize:"15px",color:c.color,
                          textDecoration:"none",fontWeight:500 }}>{c.val}</a>
                      : <div style={{ fontSize:"14px",color:"#888" }}>{c.val}</div>
                    }
                    <div style={{ fontSize:"12px",color:"#666",marginTop:"4px" }}>{c.desc}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop:"28px",padding:"24px",
                background:"rgba(201,168,94,0.06)",borderRadius:"16px",
                border:"1px solid rgba(201,168,94,0.2)",textAlign:"center" }}>
                <div style={{ fontSize:"28px",marginBottom:"12px" }}>⏱️</div>
                <h3 style={{ fontSize:"16px",fontWeight:600,color:"#FFF",marginBottom:"8px" }}>
                  وقت الرد
                </h3>
                <p style={{ fontSize:"13px",color:"#888" }}>
                  نرد على الرسائل خلال دقائق عبر واتساب.
                  للاستفسارات العاجلة اتصل مباشرة.
                </p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background:"#222",borderRadius:"20px",padding:"32px",
              border:"1px solid #2A2A2A" }}>
              {!submitted ? (
                <>
                  <h2 style={{ fontSize:"22px",fontWeight:700,color:"#FFF",marginBottom:"24px" }}>
                    📩 أرسل رسالة
                  </h2>
                  <div style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
                    <Input label="الاسم الكريم *" placeholder="اسمك"
                      value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
                    <Input label="رقم الهاتف *" placeholder="01xxxxxxxxx"
                      value={form.phone} type="tel"
                      onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
                    <div>
                      <label style={{ fontSize:"13px",color:"#B3B3B3",display:"block",marginBottom:"6px" }}>
                        رسالتك *
                      </label>
                      <textarea
                        placeholder="اكتب استفسارك أو طلبك هنا..."
                        value={form.message}
                        onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                        style={{
                          background:"#2A2A2A",border:"1px solid #444",
                          borderRadius:"12px",padding:"14px 16px",fontSize:"14px",
                          color:"#FFF",width:"100%",height:"130px",resize:"none",
                          fontFamily:"Cairo,sans-serif",outline:"none",direction:"rtl",
                        }}
                        onFocus={e=>e.target.style.borderColor="#C9A85E"}
                        onBlur={e=>e.target.style.borderColor="#444"} />
                    </div>
                    <Btn variant="primary" size="lg"
                      disabled={!form.name||!form.phone||!form.message}
                      onClick={()=>setSubmitted(true)}>
                      إرسال الرسالة
                    </Btn>
                    <div style={{ textAlign:"center" }}>
                      <span style={{ fontSize:"12px",color:"#555" }}>أو تواصل مباشرة </span>
                      <a href={buildWhatsAppUrl(form.message||"مرحبا")}
                        style={{ fontSize:"12px",color:"#25D366",fontWeight:600 }}>
                        عبر واتساب ↗
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ textAlign:"center",padding:"40px 20px" }}>
                  <div style={{ fontSize:"64px",marginBottom:"20px" }}>✅</div>
                  <h2 style={{ fontSize:"22px",fontWeight:700,color:"#22C55E",marginBottom:"12px" }}>
                    تم إرسال رسالتك!
                  </h2>
                  <p style={{ fontSize:"14px",color:"#888",lineHeight:1.8 }}>
                    شكراً لتواصلك مع غنام للعقارات. سيتواصل معك عبدالرحمن في أقرب وقت ممكن.
                  </p>
                  <Btn variant="whatsapp" size="lg"
                    href={buildWhatsAppUrl("مرحبا")}
                    style={{ marginTop:"24px" }}>
                    📱 واتساب للتواصل الفوري
                  </Btn>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ADD PROPERTY PAGE (Seller Submission)
// ═══════════════════════════════════════════════════════════

const AddPropertyPage = () => {
  const [form, setForm] = useState({
    name:"", phone:"", type:"APARTMENT", purpose:"SALE",
    district:"", price:"", area:"", description:"",
  })
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  return (
    <div style={{ paddingTop:"72px",minHeight:"100vh",background:"#1A1A1A" }}>
      <div style={{ background:"#0F0F0F",padding:"60px 0",borderBottom:"1px solid #2A2A2A" }}>
        <Container style={{ textAlign:"center" }}>
          <h1 style={{ fontSize:"36px",fontWeight:700,color:"#FFF",marginBottom:"12px" }}>
            🏠 أضف عقارك معنا
          </h1>
          <p style={{ fontSize:"15px",color:"#888",maxWidth:"500px",margin:"0 auto" }}>
            أرسل تفاصيل عقارك وسنتواصل معك في أقرب وقت لتقييمه ونشره على المنصة
          </p>
        </Container>
      </div>

      <Section>
        <Container>
          <div style={{ maxWidth:"640px",margin:"0 auto" }}>
            {!submitted ? (
              <div style={{ background:"#222",borderRadius:"20px",padding:"36px",
                border:"1px solid #2A2A2A" }}>
                <h2 style={{ fontSize:"20px",fontWeight:700,color:"#FFF",marginBottom:"28px" }}>
                  تفاصيل العقار
                </h2>

                <div style={{ display:"flex",flexDirection:"column",gap:"20px" }}>
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px" }}>
                    <Input label="اسمك *" placeholder="الاسم الكريم"
                      value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
                    <Input label="رقم الهاتف *" placeholder="01xxxxxxxxx"
                      value={form.phone} type="tel"
                      onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
                  </div>

                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px" }}>
                    <Select label="نوع العقار" value={form.type}
                      onChange={e=>setForm(p=>({...p,type:e.target.value}))}
                      options={[{value:"APARTMENT",label:"شقة"},{value:"VILLA",label:"فيلا"},
                        {value:"DUPLEX",label:"دوبلكس"},{value:"COMMERCIAL",label:"محل"},
                        {value:"LAND",label:"أرض"}]} />
                    <Select label="الغرض" value={form.purpose}
                      onChange={e=>setForm(p=>({...p,purpose:e.target.value}))}
                      options={[{value:"SALE",label:"للبيع"},{value:"RENT",label:"للإيجار"}]} />
                  </div>

                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px" }}>
                    <Select label="الحي" value={form.district}
                      onChange={e=>setForm(p=>({...p,district:e.target.value}))}
                      options={[{value:"",label:"اختر الحي"},...DISTRICTS.map(d=>({value:d.slug,label:d.nameAr}))]} />
                    <Input label="المساحة (م²)" placeholder="مثال: 150"
                      value={form.area} type="number"
                      onChange={e=>setForm(p=>({...p,area:e.target.value}))} />
                  </div>

                  <Input label="السعر المطلوب (ج.م)" placeholder="مثال: 1200000"
                    value={form.price} type="number"
                    onChange={e=>setForm(p=>({...p,price:e.target.value}))} />

                  <div>
                    <label style={{ fontSize:"13px",color:"#B3B3B3",display:"block",marginBottom:"6px" }}>
                      وصف العقار
                    </label>
                    <textarea
                      placeholder="اذكر أهم مميزات عقارك (المساحة، الطابق، التشطيب، الخدمات القريبة...)"
                      value={form.description}
                      onChange={e=>setForm(p=>({...p,description:e.target.value}))}
                      style={{
                        background:"#2A2A2A",border:"1px solid #444",borderRadius:"12px",
                        padding:"14px 16px",fontSize:"14px",color:"#FFF",width:"100%",
                        height:"120px",resize:"none",fontFamily:"Cairo,sans-serif",
                        outline:"none",direction:"rtl",
                      }}
                      onFocus={e=>e.target.style.borderColor="#C9A85E"}
                      onBlur={e=>e.target.style.borderColor="#444"} />
                  </div>

                  <div style={{ background:"rgba(201,168,94,0.06)",borderRadius:"12px",
                    padding:"16px",border:"1px solid rgba(201,168,94,0.15)" }}>
                    <p style={{ fontSize:"13px",color:"#888",lineHeight:1.7 }}>
                      💡 بعد الإرسال، سيتواصل معك عبدالرحمن غنام لمعاينة العقار وتحديد السعر
                      المناسب ثم نشره على المنصة مجاناً.
                    </p>
                  </div>

                  <Btn variant="primary" size="lg"
                    disabled={!form.name||!form.phone}
                    onClick={()=>setSubmitted(true)}>
                    إرسال تفاصيل العقار
                  </Btn>
                </div>
              </div>
            ) : (
              <div style={{ background:"#222",borderRadius:"20px",padding:"48px",
                border:"1px solid #2A2A2A",textAlign:"center" }}>
                <div style={{ fontSize:"64px",marginBottom:"20px" }}>🎉</div>
                <h2 style={{ fontSize:"24px",fontWeight:700,color:"#22C55E",marginBottom:"12px" }}>
                  تم استلام طلبك!
                </h2>
                <p style={{ fontSize:"15px",color:"#888",lineHeight:1.8,marginBottom:"28px" }}>
                  شكراً لك. سيتواصل معك عبدالرحمن غنام خلال 24 ساعة لتقييم عقارك وترتيب المعاينة.
                </p>
                <Btn variant="whatsapp" size="lg"
                  href={buildWhatsAppUrl("مرحبا، لقد أرسلت تفاصيل عقاري للتو")}>
                  📱 تواصل فوري عبر واتساب
                </Btn>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════

const AdminDashboard = ({ setPage }) => {
  const [adminPage, setAdminPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [leadStatuses, setLeadStatuses] = useState({})

  const MOCK_LEADS = [
    { id:"l1", name:"أحمد السيد",   phone:"01001234567", source:"واتساب",
      property:"شقة 3 غرف شقيق",   status:"NEW",        date:"2025-06-07" },
    { id:"l2", name:"محمد خليل",    phone:"01112345678", source:"استفسار",
      property:"دوبلكس مبارك",      status:"CONTACTED",  date:"2025-06-06" },
    { id:"l3", name:"فاطمة أحمد",   phone:"01234567890", source:"استفسار",
      property:"فيلا شقيق",         status:"QUALIFIED",  date:"2025-06-05" },
    { id:"l4", name:"كريم منصور",   phone:"01023456789", source:"واتساب",
      property:"شقة 2 غرف البندر",  status:"NEW",        date:"2025-06-04" },
  ]

  const kpis = [
    { label:"العقارات النشطة",  val:PROPERTIES.filter(p=>p.status==="ACTIVE").length,
      icon:"🏠", change:"+3 هذا الأسبوع", color:"#C9A85E" },
    { label:"عملاء اليوم",      val:3,  icon:"👥", change:"+1 منذ أمس",       color:"#22C55E" },
    { label:"مشاهدات الأسبوع", val:1243, icon:"👁", change:"+18% الأسبوع الماضي", color:"#60A5FA" },
    { label:"معدل التحويل",    val:"4.2%", icon:"📈", change:"+0.5% الشهر الماضي", color:"#F59E0B" },
  ]

  const getStatusLabel = (s) => ({
    NEW:"جديد", CONTACTED:"تم التواصل", QUALIFIED:"مؤهّل",
    NEGOTIATING:"تفاوض", CLOSED_WON:"تم الإغلاق", CLOSED_LOST:"لم يتم",
  }[s] || s)
  const getStatusColor = (s) => ({
    NEW:"#F59E0B", CONTACTED:"#60A5FA", QUALIFIED:"#22C55E",
    CLOSED_WON:"#22C55E", CLOSED_LOST:"#EF4444",
  }[s] || "#888")

  const sidebarItems = [
    { id:"dashboard",  label:"لوحة التحكم",  icon:"📊" },
    { id:"listings",   label:"العقارات",     icon:"🏠" },
    { id:"leads",      label:"العملاء",      icon:"👥" },
    { id:"blog",       label:"المدونة",      icon:"✍️"  },
    { id:"districts",  label:"الأحياء",      icon:"🏙️" },
    { id:"settings",   label:"الإعدادات",   icon:"⚙️"  },
  ]

  return (
    <div style={{ paddingTop:"72px",minHeight:"100vh",
      display:"flex",background:"#0F0F0F",direction:"rtl" }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? "260px" : "64px",
        background:"#0A0A0A",borderLeft:"1px solid #1A1A1A",
        padding:"16px 0",flexShrink:0,
        transition:"width 0.3s ease",overflow:"hidden",
        position:"sticky",top:"72px",height:"calc(100vh - 72px)",
        display:"flex",flexDirection:"column",
      }}>
        <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{
          background:"none",border:"none",padding:"8px 16px",
          cursor:"pointer",color:"#888",fontSize:"18px",
          textAlign:"right",marginBottom:"16px",
          display:"flex",alignItems:"center",justifyContent: sidebarOpen?"flex-start":"center",
        }}>
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {sidebarItems.map(item=>(
          <button key={item.id} onClick={()=>setAdminPage(item.id)} style={{
            background: adminPage===item.id ? "rgba(201,168,94,0.1)" : "none",
            border:"none",
            borderRight: adminPage===item.id ? "3px solid #C9A85E" : "3px solid transparent",
            padding:"12px 20px",cursor:"pointer",
            display:"flex",alignItems:"center",
            gap:"12px",color: adminPage===item.id ? "#C9A85E":"#888",
            fontSize:"14px",fontFamily:"Cairo,sans-serif",fontWeight:500,
            width:"100%",textAlign:"right",
            transition:"all 0.2s",
            whiteSpace:"nowrap",justifyContent: sidebarOpen?"flex-start":"center",
          }}
          onMouseEnter={e=>{ if(adminPage!==item.id) e.currentTarget.style.color="#FFF" }}
          onMouseLeave={e=>{ if(adminPage!==item.id) e.currentTarget.style.color="#888" }}>
            <span style={{ fontSize:"18px",flexShrink:0 }}>{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}

        <div style={{ marginTop:"auto",padding:"16px",borderTop:"1px solid #1A1A1A" }}>
          <button onClick={()=>setPage("home")} style={{
            background:"none",border:"none",
            padding:"10px 20px",cursor:"pointer",
            display:"flex",alignItems:"center",gap:"12px",
            color:"#EF4444",fontSize:"14px",fontFamily:"Cairo,sans-serif",
            width:"100%",justifyContent: sidebarOpen?"flex-start":"center",
          }}>
            <span>🔒</span>
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex:1,overflow:"auto",padding:"32px" }}>

        {/* Dashboard */}
        {adminPage === "dashboard" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <div style={{ display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:"32px",flexWrap:"wrap",gap:"16px" }}>
              <div>
                <h1 style={{ fontSize:"26px",fontWeight:700,color:"#FFF" }}>لوحة التحكم</h1>
                <p style={{ fontSize:"13px",color:"#666",marginTop:"4px" }}>
                  الجمعة، 7 يونيو 2025
                </p>
              </div>
              <div style={{ display:"flex",gap:"10px" }}>
                <Btn variant="primary" size="sm" onClick={()=>setAdminPage("listings")}>
                  + إضافة عقار جديد
                </Btn>
              </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
              gap:"20px",marginBottom:"32px" }}>
              {kpis.map((k,i)=>(
                <div key={i} style={{
                  background:"#1A1A1A",borderRadius:"16px",padding:"24px",
                  border:"1px solid #222",
                  boxShadow:"0 2px 12px rgba(0,0,0,0.2)",
                }}>
                  <div style={{ display:"flex",justifyContent:"space-between",
                    alignItems:"flex-start",marginBottom:"16px" }}>
                    <div style={{ fontSize:"28px" }}>{k.icon}</div>
                    <span style={{ fontSize:"11px",color:"#22C55E",
                      background:"rgba(34,197,94,0.1)",borderRadius:"100px",
                      padding:"3px 8px" }}>
                      {k.change}
                    </span>
                  </div>
                  <div style={{ fontSize:"32px",fontWeight:700,color:k.color,marginBottom:"4px" }}>
                    {k.val}
                  </div>
                  <div style={{ fontSize:"13px",color:"#666" }}>{k.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Leads */}
            <div style={{ background:"#1A1A1A",borderRadius:"16px",
              border:"1px solid #222",overflow:"hidden" }}>
              <div style={{ padding:"20px 24px",borderBottom:"1px solid #222",
                display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <h2 style={{ fontSize:"16px",fontWeight:600,color:"#FFF" }}>👥 آخر العملاء</h2>
                <Btn variant="ghost" size="sm" onClick={()=>setAdminPage("leads")}>
                  عرض الكل
                </Btn>
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",minWidth:"600px" }}>
                  <thead>
                    <tr style={{ background:"#0F0F0F" }}>
                      {["الاسم","الهاتف","العقار","المصدر","الحالة","التاريخ","إجراء"].map(h=>(
                        <th key={h} style={{ padding:"12px 16px",textAlign:"right",
                          fontSize:"12px",color:"#666",fontWeight:600,
                          fontFamily:"Cairo,sans-serif",borderBottom:"1px solid #222" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_LEADS.map((lead,i)=>{
                      const status = leadStatuses[lead.id] || lead.status
                      return (
                        <tr key={lead.id} style={{
                          borderBottom:"1px solid #1A1A1A",
                          background: i%2===0 ? "transparent" : "rgba(255,255,255,0.01)",
                          transition:"background 0.2s",
                        }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,94,0.03)"}
                        onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"transparent":"rgba(255,255,255,0.01)"}>
                          <td style={{ padding:"14px 16px",fontSize:"14px",
                            color:"#FFF",fontWeight:500 }}>{lead.name}</td>
                          <td style={{ padding:"14px 16px" }}>
                            <a href={`tel:${lead.phone}`} style={{ fontSize:"13px",
                              color:"#C9A85E",textDecoration:"none" }}>{lead.phone}</a>
                          </td>
                          <td style={{ padding:"14px 16px",fontSize:"13px",
                            color:"#888",maxWidth:"180px" }} className="clamp-1">
                            {lead.property}
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <Badge variant="default" style={{ fontSize:"11px" }}>
                              {lead.source}
                            </Badge>
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <select value={status}
                              onChange={e=>setLeadStatuses(p=>({...p,[lead.id]:e.target.value}))}
                              style={{
                                background:"transparent",
                                border:`1px solid ${getStatusColor(status)}40`,
                                color:getStatusColor(status),
                                borderRadius:"8px",padding:"4px 8px",
                                fontSize:"12px",fontFamily:"Cairo,sans-serif",
                                cursor:"pointer",
                              }}>
                              {["NEW","CONTACTED","QUALIFIED","CLOSED_WON","CLOSED_LOST"]
                                .map(s=><option key={s} value={s} style={{background:"#222",color:"#FFF"}}>{getStatusLabel(s)}</option>)}
                            </select>
                          </td>
                          <td style={{ padding:"14px 16px",fontSize:"12px",color:"#666" }}>
                            {lead.date}
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <a href={buildWhatsAppUrl(`مرحبا ${lead.name}`)}
                              style={{ fontSize:"20px",textDecoration:"none" }}>💬</a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Listings */}
        {adminPage === "listings" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <div style={{ display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:"28px",flexWrap:"wrap",gap:"16px" }}>
              <h1 style={{ fontSize:"24px",fontWeight:700,color:"#FFF" }}>🏠 إدارة العقارات</h1>
              <Btn variant="primary" size="md">+ إضافة عقار جديد</Btn>
            </div>

            <div style={{ background:"#1A1A1A",borderRadius:"16px",
              border:"1px solid #222",overflow:"hidden" }}>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",minWidth:"700px" }}>
                  <thead>
                    <tr style={{ background:"#0F0F0F" }}>
                      {["الكود","العنوان","الحي","السعر","الحالة","المشاهدات","الإجراءات"].map(h=>(
                        <th key={h} style={{ padding:"14px 16px",textAlign:"right",
                          fontSize:"12px",color:"#666",fontWeight:600,
                          fontFamily:"Cairo,sans-serif",borderBottom:"1px solid #222" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROPERTIES.map((p,i)=>(
                      <tr key={p.id} style={{
                        borderBottom:"1px solid #1A1A1A",
                        transition:"background 0.2s",
                      }}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,94,0.03)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"14px 16px" }}>
                          <span style={{ fontSize:"12px",color:"#C9A85E",fontWeight:600 }}>
                            {p.referenceCode}
                          </span>
                        </td>
                        <td style={{ padding:"14px 16px",maxWidth:"200px" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                            <img src={p.images[0]?.url} alt="" style={{
                              width:"36px",height:"36px",borderRadius:"8px",
                              objectFit:"cover",flexShrink:0 }} />
                            <span style={{ fontSize:"13px",color:"#FFF",fontWeight:500 }}
                              className="clamp-1">{p.titleAr}</span>
                          </div>
                        </td>
                        <td style={{ padding:"14px 16px",fontSize:"13px",color:"#888" }}>
                          {p.district.nameAr}
                        </td>
                        <td style={{ padding:"14px 16px",fontSize:"14px",
                          color:"#C9A85E",fontWeight:600 }}>
                          {formatPrice(p.price, p.purpose)}
                        </td>
                        <td style={{ padding:"14px 16px" }}>
                          <Badge variant={p.status==="ACTIVE"?"verified":"default"}>
                            {p.status==="ACTIVE"?"نشط":"في الانتظار"}
                          </Badge>
                        </td>
                        <td style={{ padding:"14px 16px",fontSize:"13px",color:"#888" }}>
                          {p.viewCount}
                        </td>
                        <td style={{ padding:"14px 16px" }}>
                          <div style={{ display:"flex",gap:"6px" }}>
                            <Btn variant="ghost" size="sm">✏️ تعديل</Btn>
                            <Btn variant="danger" size="sm">🗑️</Btn>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Leads full table */}
        {adminPage === "leads" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <div style={{ display:"flex",justifyContent:"space-between",
              alignItems:"center",marginBottom:"28px" }}>
              <h1 style={{ fontSize:"24px",fontWeight:700,color:"#FFF" }}>👥 إدارة العملاء</h1>
              <Btn variant="ghost" size="sm">📥 تصدير CSV</Btn>
            </div>
            <div style={{ background:"#1A1A1A",borderRadius:"16px",
              border:"1px solid #222",overflow:"hidden" }}>
              <div style={{ padding:"16px 20px",borderBottom:"1px solid #222",
                display:"flex",gap:"12px",flexWrap:"wrap" }}>
                {["الكل","جديد","تم التواصل","مؤهّل"].map(f=>(
                  <button key={f} style={{
                    background:"#222",border:"1px solid #333",
                    borderRadius:"100px",padding:"6px 14px",
                    fontSize:"12px",color:"#888",cursor:"pointer",
                    fontFamily:"Cairo,sans-serif",
                  }}>{f}</button>
                ))}
              </div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",minWidth:"600px" }}>
                  <thead>
                    <tr style={{ background:"#0F0F0F" }}>
                      {["الاسم","الهاتف","العقار","المصدر","الحالة","التاريخ","إجراء"].map(h=>(
                        <th key={h} style={{ padding:"14px 16px",textAlign:"right",
                          fontSize:"12px",color:"#666",fontWeight:600,
                          fontFamily:"Cairo,sans-serif",borderBottom:"1px solid #222" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_LEADS.map((lead,i)=>{
                      const status = leadStatuses[lead.id] || lead.status
                      return (
                        <tr key={lead.id} style={{ borderBottom:"1px solid #1A1A1A" }}
                          onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,94,0.03)"}
                          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <td style={{ padding:"14px 16px",fontSize:"14px",color:"#FFF",fontWeight:500 }}>
                            {lead.name}
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <a href={`tel:${lead.phone}`} style={{ fontSize:"13px",
                              color:"#C9A85E",textDecoration:"none" }}>{lead.phone}</a>
                          </td>
                          <td style={{ padding:"14px 16px",fontSize:"13px",color:"#888" }}>
                            {lead.property}
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <Badge variant="default" style={{ fontSize:"11px" }}>{lead.source}</Badge>
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <select value={status}
                              onChange={e=>setLeadStatuses(p=>({...p,[lead.id]:e.target.value}))}
                              style={{
                                background:"transparent",
                                border:`1px solid ${getStatusColor(status)}40`,
                                color:getStatusColor(status),
                                borderRadius:"8px",padding:"4px 8px",
                                fontSize:"12px",fontFamily:"Cairo,sans-serif",cursor:"pointer",
                              }}>
                              {["NEW","CONTACTED","QUALIFIED","CLOSED_WON","CLOSED_LOST"]
                                .map(s=><option key={s} value={s} style={{background:"#222",color:"#FFF"}}>
                                  {getStatusLabel(s)}</option>)}
                            </select>
                          </td>
                          <td style={{ padding:"14px 16px",fontSize:"12px",color:"#666" }}>
                            {lead.date}
                          </td>
                          <td style={{ padding:"14px 16px" }}>
                            <div style={{ display:"flex",gap:"6px" }}>
                              <a href={buildWhatsAppUrl(`مرحبا ${lead.name}`)}
                                style={{ fontSize:"20px",textDecoration:"none" }}>💬</a>
                              <a href={`tel:${lead.phone}`}
                                style={{ fontSize:"20px",textDecoration:"none" }}>📞</a>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {adminPage === "settings" && (
          <div style={{ animation:"fadeIn 0.3s ease",maxWidth:"600px" }}>
            <h1 style={{ fontSize:"24px",fontWeight:700,color:"#FFF",marginBottom:"28px" }}>
              ⚙️ إعدادات الموقع
            </h1>
            <div style={{ background:"#1A1A1A",borderRadius:"16px",padding:"28px",
              border:"1px solid #222",display:"flex",flexDirection:"column",gap:"20px" }}>
              <Input label="رقم واتساب" value={PHONE_NUMBER} onChange={()=>{}} />
              <Input label="رقم الهاتف" value={PHONE_NUMBER} onChange={()=>{}} />
              <Input label="البريد الإلكتروني" value="info@ghanam-realestate.com" onChange={()=>{}} />
              <Input label="رابط فيسبوك" value="" placeholder="https://facebook.com/..." onChange={()=>{}} />
              <Input label="رابط إنستجرام" value="" placeholder="https://instagram.com/..." onChange={()=>{}} />
              <div>
                <label style={{ fontSize:"13px",color:"#B3B3B3",display:"block",marginBottom:"6px" }}>
                  وصف الموقع (SEO)
                </label>
                <textarea style={{
                  background:"#2A2A2A",border:"1px solid #444",borderRadius:"12px",
                  padding:"12px 16px",fontSize:"14px",color:"#FFF",width:"100%",
                  height:"80px",resize:"none",fontFamily:"Cairo,sans-serif",
                  outline:"none",direction:"rtl",
                }} defaultValue="غنام للعقارات — متخصصون في بيع وإيجار العقارات في المحلة الكبرى" />
              </div>
              <Btn variant="primary" size="md">💾 حفظ الإعدادات</Btn>
            </div>
          </div>
        )}

        {/* Other admin pages placeholder */}
        {!["dashboard","listings","leads","settings"].includes(adminPage) && (
          <div style={{ textAlign:"center",padding:"80px 0" }}>
            <div style={{ fontSize:"48px",marginBottom:"16px" }}>🔧</div>
            <h2 style={{ fontSize:"22px",fontWeight:700,color:"#FFF",marginBottom:"8px" }}>
              {sidebarItems.find(s=>s.id===adminPage)?.label}
            </h2>
            <p style={{ color:"#666",fontSize:"14px" }}>
              هذا القسم سيتم ربطه مع Sanity CMS وقاعدة البيانات
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════

const LoginPage = ({ setPage }) => {
  const [form, setForm] = useState({ email:"", password:"" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setError("")
    setTimeout(()=>{
      if (form.email==="admin@ghanam.com" && form.password==="admin2025") {
        setPage("admin")
      } else {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{ minHeight:"100vh",background:"#0A0A0A",
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"20px" }}>
      <div style={{
        background:"#1A1A1A",borderRadius:"24px",padding:"48px",
        border:"1px solid #2A2A2A",width:"100%",maxWidth:"400px",
        boxShadow:"0 20px 60px rgba(0,0,0,0.5)",
        animation:"scaleIn 0.4s ease",
      }}>
        <div style={{ textAlign:"center",marginBottom:"36px" }}>
          <div style={{
            width:"64px",height:"64px",borderRadius:"16px",
            background:"linear-gradient(135deg,#C9A85E,#A8863A)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"28px",margin:"0 auto 16px",
          }}>🏠</div>
          <h1 style={{ fontSize:"22px",fontWeight:700,color:"#FFF" }}>لوحة التحكم</h1>
          <p style={{ fontSize:"13px",color:"#666",marginTop:"4px" }}>غنام للعقارات</p>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
          <Input label="البريد الإلكتروني" placeholder="admin@ghanam.com"
            value={form.email} type="email"
            onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
          <Input label="كلمة المرور" placeholder="••••••••"
            value={form.password} type="password"
            onChange={e=>setForm(p=>({...p,password:e.target.value}))}
            error={error} />

          <div style={{ fontSize:"12px",color:"#555",textAlign:"center",
            padding:"8px",background:"#2A2A2A",borderRadius:"8px" }}>
            تجريبي: admin@ghanam.com / admin2025
          </div>

          <Btn variant="primary" size="lg"
            disabled={!form.email||!form.password||loading}
            onClick={handleLogin}>
            {loading ? "جاري الدخول..." : "دخول →"}
          </Btn>

          <button onClick={()=>setPage("home")} style={{
            background:"none",border:"none",color:"#888",cursor:"pointer",
            fontSize:"13px",fontFamily:"Cairo,sans-serif",marginTop:"8px",
          }}>
            ← العودة للموقع
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN APP ROUTER
// ═══════════════════════════════════════════════════════════

export default function GhanamRealEstate() {
  const [page, setPage] = useState("home")
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Scroll to top on page change
  useEffect(() => {
    const el = document.querySelector(".app-root")
    if (el) el.scrollTo(0, 0)
  }, [page])

  const showHeader = !["admin", "login"].includes(page)
  const showFooter = !["admin", "login", "property-detail"].includes(page)

  const renderPage = () => {
    switch(page) {
      case "home":
        return <HomePage setPage={setPage} setSelectedProperty={setSelectedProperty} />
      case "properties":
        return <PropertiesPage setPage={setPage} setSelectedProperty={setSelectedProperty} />
      case "property-detail":
        return <PropertyDetailPage property={selectedProperty}
                 setPage={setPage} setSelectedProperty={setSelectedProperty} />
      case "districts":
        return <DistrictsPage setPage={setPage} setSelectedProperty={setSelectedProperty} />
      case "blog":
        return <BlogPage />
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      case "add-property":
        return <AddPropertyPage />
      case "admin":
        return <AdminDashboard setPage={setPage} />
      case "login":
        return <LoginPage setPage={setPage} />
      default:
        return <HomePage setPage={setPage} setSelectedProperty={setSelectedProperty} />
    }
  }

  return (
    <div className="app-root" style={{
      fontFamily:"Cairo,'Tajawal',Arial,sans-serif",
      background:"#1A1A1A",minHeight:"100vh",
      direction:"rtl",
      overflowX:"hidden",
    }}>
      <GlobalStyle />

      {showHeader && <Header page={page} setPage={setPage} />}

      <div style={{ minHeight:"100vh" }}>
        {renderPage()}
      </div>

      {showFooter && <Footer setPage={setPage} />}

      {/* Admin login entry (bottom bar hint) */}
      {page === "home" && (
        <div style={{
          position:"fixed",bottom:"20px",right:"20px",zIndex:50,
        }}>
          <button onClick={()=>setPage("login")} style={{
            background:"rgba(30,30,30,0.9)",border:"1px solid #333",
            borderRadius:"8px",padding:"6px 14px",
            fontSize:"11px",color:"#555",cursor:"pointer",
            fontFamily:"Cairo,sans-serif",backdropFilter:"blur(10px)",
          }}>
            🔒 Admin
          </button>
        </div>
      )}
    </div>
  )
}
