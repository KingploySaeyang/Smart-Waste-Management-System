/**
 * =========================================================
 * Firebase Base Configuration (Global)
 * File: public/db_config.js
 * Firebase SDK: v8.x
 * ใช้ร่วมกันทุกหน้า (Admin / User)
 * =========================================================
 */

(function (window) {
    'use strict';

    // ถ้ามีอยู่แล้ว ไม่ต้อง init ซ้ำ
    if (window.SWFirebase) {
        return;
    }

    // -----------------------------------------------------
    // Firebase Project Configuration
    // -----------------------------------------------------
    var firebaseConfig = {
        apiKey: "AIzaSyA9SQW3iUwZWCgeG6eOYvvMU5g2hb_Zlrw",
        authDomain: "smartwaste2568-1d792.firebaseapp.com",
        projectId: "smartwaste2568-1d792",
        storageBucket: "smartwaste2568-1d792.firebasestorage.app",
        messagingSenderId: "1041339993312",
        appId: "1:1041339993312:web:65b26ea83dcbf4f8b29485",
        measurementId: "G-FV5TEPVZWN",
        databaseURL: "https://smartwaste2568-1d792-default-rtdb.asia-southeast1.firebasedatabase.app"
    };

    // -----------------------------------------------------
    // Initialize Firebase (ครั้งเดียวเท่านั้น)
    // -----------------------------------------------------
    if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // -----------------------------------------------------
    // Create Shared Firebase Services
    // -----------------------------------------------------
    var app = firebase.app();

    var firestore = firebase.firestore();
    var database = firebase.database();
    var auth = firebase.auth ? firebase.auth() : null;

    // ตั้งค่า Firestore เพิ่มเติม (ถ้าต้องการ)
    // firestore.settings({ ignoreUndefinedProperties: true });

    // -----------------------------------------------------
    // Expose Global Object
    // -----------------------------------------------------
    window.SWFirebase = {
        app: app,
        firestore: firestore,
        database: database,
        auth: auth,
        FieldValue: firebase.firestore.FieldValue
    };

})(window);
