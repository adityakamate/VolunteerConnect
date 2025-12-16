package com.uvp.utility;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;

public class CertificateGenerator {

    public static void createCertificate(String userName, String taskTitle, String organizationName, String filePath,
            String qrBase64) throws Exception {

        // 1. Define SVGs
        // Background with Paper Texture Filter
        String backgroundSvg = """
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 842 595" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#1a365d;stop-opacity:1" />
                        </linearGradient>
                        <filter id="paper">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                            <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="2">
                                <feDistantLight azimuth="45" elevation="60" />
                            </feDiffuseLighting>
                        </filter>
                    </defs>

                    <!-- White Base -->
                    <rect width="100%" height="100%" fill="#ffffff" />

                    <!-- Paper Texture Overlay -->
                    <rect width="100%" height="100%" filter="url(#paper)" opacity="0.3" />

                    <!-- Particles -->
                    <circle cx="100" cy="100" r="3" fill="#c5a059" opacity="0.5" />
                    <circle cx="150" cy="80" r="4" fill="#3498db" opacity="0.3" />
                    <circle cx="700" cy="500" r="3" fill="#c5a059" opacity="0.5" />
                    <circle cx="750" cy="520" r="4" fill="#3498db" opacity="0.3" />

                    <!-- Top Right Wave -->
                    <path d="M 650 0 C 720 150 842 80 842 250 L 842 0 Z" fill="url(#blueGrad)" />
                    <path d="M 650 0 C 720 150 842 80 842 250" fill="none" stroke="#c5a059" stroke-width="4" />
                    <path d="M 670 0 C 740 140 820 100 842 230" fill="none" stroke="#c5a059" stroke-width="1" opacity="0.6" />

                    <!-- Bottom Left Wave -->
                    <path d="M 0 595 L 0 450 C 100 550 250 500 350 595 Z" fill="url(#blueGrad)" />
                    <path d="M 0 450 C 100 550 250 500 350 595" fill="none" stroke="#c5a059" stroke-width="4" />
                    <path d="M 0 470 C 120 560 230 520 330 595" fill="none" stroke="#c5a059" stroke-width="1" opacity="0.6" />
                </svg>
                """;

        // Ribbon with Softer Drop Shadow
        String ribbonSvg = """
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 610 100" preserveAspectRatio="none">
                    <defs>
                        <filter id="blurFilter">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                        </filter>
                    </defs>

                    <!-- Shadow Path (Blurred & Transparent) -->
                    <path d="M 20 0 L 580 0 L 600 40 L 580 80 L 20 80 L 0 40 Z"
                          fill="#000000" opacity="0.25" filter="url(#blurFilter)" transform="translate(5, 5)" />

                    <!-- Main Ribbon -->
                    <path d="M 20 0 L 580 0 L 600 40 L 580 80 L 20 80 L 0 40 Z" fill="#2980b9" />
                    <path d="M 20 0 L 580 0 L 600 40 L 580 80 L 20 80 L 0 40 Z" fill="none" stroke="#f1c40f" stroke-width="3" />
                </svg>
                """;

        String logoSvg = """
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#2c3e50" stroke-width="5"/>
                    <path d="M50 10 L90 40 L75 90 L25 90 L10 40 Z" fill="none" stroke="#3498db" stroke-width="3"/>
                    <text x="50" y="65" font-family="Arial" font-size="40" text-anchor="middle" fill="#2c3e50">V</text>
                </svg>
                """;

        // 2. Encode SVGs to Base64
        String bgBase64 = Base64.getEncoder().encodeToString(backgroundSvg.getBytes());
        String ribbonBase64 = Base64.getEncoder().encodeToString(ribbonSvg.getBytes());
        String logoBase64 = Base64.getEncoder().encodeToString(logoSvg.getBytes());

        // 3. HTML Template with Absolute Positioning and Img Tags
        String htmlTemplate = """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        @page {
                            size: A4 landscape;
                            margin: 0;
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: 'Times New Roman', serif;
                            background-color: #ffffff;
                            overflow: hidden;
                        }
                        .container {
                            width: 11.6in;
                            height: 8.2in;
                            position: relative;
                            overflow: hidden;
                            margin: 0 auto;
                        }

                        /* Images */
                        .bg-img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 11.69in;
                            height: 8.27in;
                            z-index: 0;
                        }
                        .logo-img {
                            position: absolute;
                            top: 50px;
                            left: 60px;
                            width: 60px;
                            height: 60px;
                            z-index: 20;
                        }
                        .ribbon-img {
                            position: absolute;
                            top: 280px;
                            left: 50%;
                            margin-left: -305px;
                            width: 610px;
                            height: 100px;
                            z-index: 5;
                        }

                        /* Text Elements */
                        .logo-text {
                            position: absolute;
                            top: 55px;
                            left: 135px;
                            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                            font-size: 16px;
                            font-weight: bold;
                            color: #1a365d;
                            line-height: 1.2;
                            z-index: 20;
                            text-transform: uppercase;
                        }

                        .title-main {
                            position: absolute;
                            top: 70px;
                            width: 100%;
                            text-align: center;
                            font-size: 72px;
                            font-weight: bold;
                            color: #1a365d;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            z-index: 20;
                            font-family: 'Times New Roman', serif;
                        }
                        .title-sub {
                            position: absolute;
                            top: 160px;
                            width: 100%;
                            text-align: center;
                            font-size: 32px;
                            color: #c5a059;
                            letter-spacing: 5px;
                            text-transform: uppercase;
                            z-index: 20;
                            font-family: 'Times New Roman', serif;
                        }

                        /* Separator Lines */
                        .sep-left {
                            position: absolute;
                            top: 240px;
                            left: 20%;
                            width: 25%;
                            border-top: 1px solid #d0d0d0;
                            z-index: 20;
                        }
                        .sep-text {
                            position: absolute;
                            top: 230px;
                            left: 45%;
                            width: 10%;
                            text-align: center;
                            font-style: italic;
                            color: #7f8c8d;
                            font-size: 18px;
                            z-index: 20;
                            font-family: 'Georgia', serif;
                        }
                        .sep-right {
                            position: absolute;
                            top: 240px;
                            left: 55%;
                            width: 25%;
                            border-top: 1px solid #d0d0d0;
                            z-index: 20;
                        }

                        /* Name */
                        .name-text {
                            position: absolute;
                            top: 280px;
                            width: 100%;
                            text-align: center;
                            line-height: 80px;
                            font-size: 44px;
                            font-weight: bold;
                            color: #ffffff;
                            z-index: 10;
                            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                        }

                        /* Task Info */
                        .task-intro {
                            position: absolute;
                            top: 400px;
                            width: 100%;
                            text-align: center;
                            font-size: 18px;
                            color: #2c3e50;
                            z-index: 20;
                            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                        }
                        .task-title {
                            position: absolute;
                            top: 430px;
                            width: 100%;
                            text-align: center;
                            font-size: 28px;
                            font-weight: bold;
                            color: #1a365d;
                            z-index: 20;
                            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                        }
                        .org-name {
                            position: absolute;
                            top: 470px;
                            width: 100%;
                            text-align: center;
                            font-size: 22px;
                            font-weight: bold;
                            color: #2980b9;
                            z-index: 20;
                            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                        }

                        /* Description */
                        .desc {
                            position: absolute;
                            top: 530px;
                            left: 15%;
                            width: 70%;
                            text-align: center;
                            font-size: 20px;
                            line-height: 1.6;
                            font-style: italic;
                            color: #555;
                            font-family: 'Georgia', serif;
                            z-index: 20;
                        }

                        /* Footer */
                        .date-line {
                            position: absolute;
                            bottom: 70px;
                            left: 40%;
                            width: 20%;
                            text-align: center;
                            border-top: 1px solid #7f8c8d;
                            padding-top: 5px;
                            color: #34495e;
                            z-index: 20;
                            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
                        }

                        .qr-box {
                            position: absolute;
                            bottom: 50px;
                            right: 70px;
                            width: 90px;
                            height: 90px;
                            border: 2px solid #c5a059;
                            padding: 4px; /* Reduced padding slightly */
                            background: #fff;
                            z-index: 20;
                        }
                        .qr-img {
                            width: 100%;
                            height: 100%;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <!-- Background Image -->
                        <img class="bg-img" src="data:image/svg+xml;base64,[BG_BASE64]" />

                        <!-- Logo -->
                        <img class="logo-img" src="data:image/svg+xml;base64,[LOGO_BASE64]" />
                        <div class="logo-text">UNIFIED<br/>VOLUNTEERING<br/>PORTAL (UVP)</div>

                        <!-- Header -->
                        <div class="title-main">CERTIFICATE</div>
                        <div class="title-sub">OF APPRECIATION</div>

                        <!-- Separator -->
                        <div class="sep-left"></div>
                        <div class="sep-text">Presented to</div>
                        <div class="sep-right"></div>

                        <!-- Name Ribbon -->
                        <img class="ribbon-img" src="data:image/svg+xml;base64,[RIBBON_BASE64]" />
                        <div class="name-text">[Volunteer's Name]</div>

                        <!-- Details -->
                        <div class="task-intro">For successfully completing the task:</div>
                        <div class="task-title">[Task Name]</div>
                        <div class="org-name">with [Organization Name]</div>

                        <div class="desc">
                            "Your dedicated service and invaluable contribution to the mission of the
                            Unified Volunteering Portal are greatly appreciated.
                            Your commitment to volunteerism drives positive change globally."
                        </div>

                        <!-- Footer -->
                        <div class="date-line">[Date of Issue]</div>

                        <div class="qr-box">
                            <img class="qr-img" src="data:image/png;base64,[QR_BASE64]" />
                        </div>
                    </div>
                </body>
                </html>
                """;

        String html = htmlTemplate
                .replace("[BG_BASE64]", bgBase64)
                .replace("[RIBBON_BASE64]", ribbonBase64)
                .replace("[LOGO_BASE64]", logoBase64)
                .replace("[Volunteer's Name]", userName)
                .replace("[Task Name]", taskTitle)
                .replace("[Organization Name]", organizationName)
                .replace("[Date of Issue]", java.time.LocalDate.now().toString())
                .replace("[QR_BASE64]", qrBase64);

        try (OutputStream os = new FileOutputStream(filePath)) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            // Enable SVG support
            builder.useSVGDrawer(new com.openhtmltopdf.svgsupport.BatikSVGDrawer());
            builder.withHtmlContent(html, null);
            builder.toStream(os);
            builder.run();
        }
    }
}
