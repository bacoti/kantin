import axios from "axios";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * INI ADALAH BAGIAN PENTING YANG MEMPERBAIKI MASALAH
 *
 * `withCredentials: true` memberitahu axios untuk mengirim cookie
 * (termasuk session cookie Laravel) saat membuat permintaan ke API.
 * Tanpa ini, Laravel tidak akan mengenali Anda sebagai user yang sudah login.
 */
window.axios.defaults.withCredentials = true;

/**
 * Setup CSRF token untuk Sanctum
 */
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

/**
 * Setup X-XSRF-TOKEN untuk Sanctum (dari cookie)
 * Kita akan mengambil XSRF token dari Sanctum CSRF endpoint
 */
window.axios.get("/sanctum/csrf-cookie").then(() => {
    // Token akan disimpan di cookie otomatis
});

window.axios.interceptors.request.use(function (config) {
    let token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="));
    if (token) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(
            token.split("=")[1]
        );
    }
    return config;
});

/**
 * Kita juga akan mengatur baseURL agar semua permintaan axios
 * secara otomatis diarahkan ke server Laravel Anda.
 * Ganti 'http://127.0.0.1:8000' jika Anda menggunakan URL yang berbeda.
 */
window.axios.defaults.baseURL = "http://127.0.0.1:8000";
