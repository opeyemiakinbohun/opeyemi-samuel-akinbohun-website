/**
 * Textbook Paillier with g = n + 1, used only by the browser demonstration.
 * The demo key below is deliberately tiny (n is about 20 bits) so it runs instantly.
 * It is insecure and educational. Real deployments use 2048-bit or larger moduli.
 */

export type PaillierKey = { p: bigint; q: bigint; n: bigint; n2: bigint; lambda: bigint; mu: bigint };

export function modPow(b: bigint, e: bigint, m: bigint) {
  let r = 1n;
  b %= m;
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return r;
}
export function gcd(a: bigint, b: bigint): bigint {
  while (b) [a, b] = [b, a % b];
  return a < 0n ? -a : a;
}
export function modInv(a: bigint, m: bigint) {
  let [o, r] = [((a % m) + m) % m, m];
  let [s0, s1] = [1n, 0n];
  while (r) {
    const q = o / r;
    [o, r] = [r, o - q * r];
    [s0, s1] = [s1, s0 - q * s1];
  }
  if (o !== 1n) throw new Error("not invertible");
  return ((s0 % m) + m) % m;
}

export function makeKey(p: bigint, q: bigint): PaillierKey {
  const n = p * q;
  const lambda = ((p - 1n) * (q - 1n)) / gcd(p - 1n, q - 1n);
  // With g = n + 1, L(g^lambda mod n^2) = lambda mod n, so mu = lambda^-1 mod n.
  const mu = modInv(lambda % n, n);
  return { p, q, n, n2: n * n, lambda, mu };
}

/** Demonstration key: p = 1009, q = 1013. Insecure on purpose. */
export const DEMO_KEY = makeKey(1009n, 1013n);

export function bitLength(x: bigint) {
  return x.toString(2).length;
}

export function randomR(k: PaillierKey, rand: () => number = Math.random) {
  let r: bigint;
  do r = 2n + BigInt(Math.floor(rand() * Number(k.n - 3n)));
  while (gcd(r, k.n) !== 1n);
  return r;
}

/** E(m) = (1 + m n) r^n mod n^2 */
export function encrypt(k: PaillierKey, m: bigint, r: bigint = randomR(k)) {
  return (((1n + ((m % k.n) * k.n)) % k.n2) * modPow(r, k.n, k.n2)) % k.n2;
}

/** D(c) = L(c^lambda mod n^2) * mu mod n, with L(x) = (x - 1) / n */
export function decrypt(k: PaillierKey, c: bigint) {
  const u = modPow(c, k.lambda, k.n2);
  return (((u - 1n) / k.n) * k.mu) % k.n;
}

/** Homomorphic addition: E(a) * E(b) mod n^2 decrypts to a + b mod n. */
export function addCiphertexts(k: PaillierKey, cs: bigint[]) {
  return cs.reduce((acc, c) => (acc * c) % k.n2, 1n);
}

/** A ciphertext is well formed if 0 < c < n^2 and gcd(c, n) = 1. */
export function isValidCiphertext(k: PaillierKey, c: bigint) {
  return c > 0n && c < k.n2 && gcd(c, k.n) === 1n;
}
