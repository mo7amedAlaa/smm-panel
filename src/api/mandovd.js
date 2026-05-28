const BASE = "https://mandovd.com/api/v2";

async function post(key, params) {
  const fd = new FormData();
  fd.append("key", key);
  Object.entries(params).forEach(([k, v]) => fd.append(k, v));
  const res = await fetch(BASE, { method: "POST", body: fd });
  return res.json();
}

export const api = {
  balance: (key) => post(key, { action: "balance" }),
  services: (key) => post(key, { action: "services" }),
  addOrder: (key, p) => post(key, { action: "add", ...p }),
  status: (key, id) => post(key, { action: "status", order: id }),
  statuses: (key, ids) => post(key, { action: "status", orders: ids }),
  refill: (key, id) => post(key, { action: "refill", order: id }),
  cancel: (key, ids) => post(key, { action: "cancel", orders: ids }),
};
