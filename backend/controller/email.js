// import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();
const resend = new Resend(process.env.resendApiKey);

export async function sendEmail(to, Code) {
  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.example.com',
  //   port: 587,
  //   secure: false,
  //   service: 'Gmail',
  //   auth: {
  //     user: process.env.user,
  //     pass: process.env.password,
  //   },
  // });

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to,
    subject: 'Hello World',
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <title>Restablecer Contraseña - BrisaZen</title>
          <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&amp;family=Quicksand:wght@400;500;700&amp;display=swap"
            rel="stylesheet"
          />
          <script>
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    primary: '#388E3C',
                    'background-light': '#FFFBEF',
                    'background-dark': '#1F2937',
                    'text-light': '#44403C',
                    'text-dark': '#E5E7EB',
                    'border-light': '#4CAF50',
                    'border-dark': '#4ADE80',
                    'input-bg-light': '#FDF8E6',
                    'input-bg-dark': '#374151',
                  },
                  fontFamily: {
                    display: ['Playfair Display', 'serif'],
                    sans: ['Quicksand', 'sans-serif'],
                  },
                  borderRadius: {
                    DEFAULT: '0.75rem', // 12px
                  },
                },
              },
            };
          </script>
          <style>
            body {
              font-family: 'Quicksand', sans-serif;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
            }
          </style>
        </head>
        <body
          class="bg-background-light dark:bg-background-dark font-sans"
          style="
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            word-spacing: normal;
          "
        >
          <div
            aria-roledescription="email"
            class="email-container p-4 sm:p-6"
            lang="es"
            role="article"
          >
            <main
              class="w-full bg-background-light dark:bg-background-dark rounded-lg shadow-lg overflow-hidden"
            >
              <div class="px-6 py-8 sm:px-10">
                <div class="text-center">
                  <div class="flex justify-center items-center space-x-2 my-6">
                    <span class="h-2 w-2 rounded-full bg-primary"></span>
                    <span class="h-2 w-2 rounded-full bg-primary"></span>
                    <span class="h-2 w-2 rounded-full bg-primary"></span>
                  </div>
                  <h2
                    class="font-display text-3xl font-bold text-primary italic mb-4"
                  >
                    Restablecer contraseña
                  </h2>
                  <p class="text-text-light dark:text-text-dark mb-6">
                    ¡Hola! Hemos recibido una solicitud para restablecer tu
                    contraseña.
                  </p>
                  <p class="text-text-light dark:text-text-dark mb-6">
                    A continuación copia este token para restablecer la contraseña:
                  </p>
                </div>
                <div class="mb-6">
                  <div
                    class="w-full text-center bg-input-bg-light dark:bg-input-bg-dark border-2 border-dashed border-border-light dark:border-border-dark rounded-DEFAULT py-4 px-2"
                  >
                    <p
                      class="text-primary dark:text-border-dark font-bold text-2xl tracking-widest"
                    >
                    ${Code}
                    </p>
                  </div>
                </div>
  
                <div
                  class="mt-8 text-center text-sm text-text-light dark:text-text-dark/80"
                >
                  <p class="font-bold mb-2">
                    Para tu seguridad, tu nueva contraseña debe tener:
                  </p>
                  <ul class="list-disc list-inside inline-block text-left">
                    <li>Mínimo 8 caracteres</li>
                    <li>Mezclar letras, números y símbolos</li>
                    <li>Evitar información personal</li>
                  </ul>
                  <p class="mt-4">
                    Si no solicitaste este cambio, puedes ignorar este correo.
                  </p>
                </div>
                <div class="flex justify-center items-center space-x-2 mt-8">
                  <span class="h-2 w-2 rounded-full bg-primary"></span>
                  <span class="h-2 w-2 rounded-full bg-primary"></span>
                  <span class="h-2 w-2 rounded-full bg-primary"></span>
                </div>
              </div>
            </main>
          </div>
        </body>
      </html>

    `,
  });
}

// sendEmail('correo');
