/* eslint-disable max-len */
/* eslint-disable quotes */
const welcomeContent = {
  en: {
    subject: 'Welcome to the dEquity family!',
    second: {
      dear: 'Dear',
      welcome: {
        st1: 'Welcome to',
        st2: 'a platform where <br /> income-producing assets are',
        st3: 'a few clicks away!',
      },
      text: "We're thrilled to have you on board. As a new member, you now have the exciting opportunity to dive into our testnet.",
    },
    third: {
      title: "Here's what you can look forward to:",
      st1: {
        label: 'Testnet Participation',
        text: 'Engage in risk-free real estate investment with virtual funds. Test different strategies, familiarize yourself with the platform, and learn how to generate yield, accumulate more capital and hedge against inflation, all in one app!',
      },
      st2: {
        label: 'Bonus Program',
        text: 'Earn points as you participate! The more you engage in the testnet, the more points you get in our bonus program. These points can be converted into exciting benefits when we launch our platform in the mainnet.',
      },
      st3: {
        label: 'Whitelist Benefit',
        text: 'The more points you get, the better your rank in the Whitelist, leading to a bigger bonus at the launch.',
      },
    },
    fourth: {
      title: 'Тhank you!',
      p1: 'for joining us on our journey to create a world where Real Estate is fully open, borderless, liquid, and accessible to anyone!  Your experience during the testnet phase will help us refine and optimise our platform.',
      p2: {
        st1: 'You can reach out to us at',
        st2: 'if you have any questions, and our team will take care of you!',
      },
      p3: 'Best Regards, the Team dEquity',
    },
  },
  es: {
    subject: 'Bienvenido a dEquity - ¡Tu puerta a la innovación inmobiliaria!',
    second: {
      dear: 'Estimado',
      welcome: {
        st1: 'Bienvenido a',
        st2: 'una plataforma donde los activos que producen ingresos están a',
        st3: 'unos pocos clics de distancia.',
      },
      text: 'Estamos encantados de tenerte a bordo. Como nuevo miembro, ahora tienes la emocionante oportunidad de interactuar con nuestra plataforma en fase testnet.',
    },
    third: {
      title: 'Esto es lo que te espera:',
      st1: {
        label: 'Participación en la Testnet',
        text: 'Participa en inversiones inmobiliarias sin riesgo con fondos virtuales. Prueba diferentes estrategias, familiarízate con la plataforma y aprende a generar un rendimiento, acumular más capital y protegerte contra la inflación, ¡todo en una sola aplicación!',
      },
      st2: {
        label: 'Programa de Bonos',
        text: '¡Gana puntos a medida que participes! Cuanto más participes en la testnet, más puntos obtendrás en nuestro programa de bonos. Estos puntos pueden convertirse en interesantes beneficios cuando lancemos nuestra plataforma al público en la fase mainnet.',
      },
      st3: {
        label: 'Beneficios de la Lista de Espera',
        text: 'Cuantos más puntos consigas, mejor será tu posición en la Lista de Espera (Whitelist), lo que te permitirá obtener mayores bonos en el lanzamiento.',
      },
    },
    fourth: {
      title: 'Gracias por unirte',
      p1: 'a nosotros en nuestro viaje para crear un mundo en el que los bienes inmuebles sean totalmente abiertos, sin fronteras, líquidos y accesibles para cualquiera. Tu experiencia durante la fase testnet nos ayudará a perfeccionar y optimizar nuestra plataforma.',
      p2: {
        st1: 'Puedes ponerte en contacto con nosotros en',
        st2: 'si tienes alguna pregunta, ¡y nuestro equipo te responderá de inmediato!',
      },
      p3: 'Un cordial saludo, El equipo de dEquity',
    },
  },
  pt: {
    subject: '',
    second: {
      dear: '',
      welcome: {
        st1: '',
        st2: '',
        st3: '',
      },
      text: '',
    },
    third: {
      title: '',
      st1: {
        label: '',
        text: '',
      },
      st2: {
        label: '',
        text: '',
      },
      st3: {
        label: '',
        text: '',
      },
    },
    fourth: {
      title: '',
      p1: '',
      p2: {
        st1: '',
        st2: '',
      },
      p3: '',
    },
  },
};

interface IContent {
  subject: string;
  second: {
    dear: string;
    welcome: {
      st1: string;
      st2: string;
      st3: string;
    };
    text: string;
  };
  third: {
    title: string;
    st1: {
      label: string;
      text: string;
    };
    st2: {
      label: string;
      text: string;
    };
    st3: {
      label: string;
      text: string;
    };
  };
  fourth: {
    title: string;
    p1: string;
    p2: {
      st1: string;
      st2: string;
    };
    p3: string;
  };
}

const langs = ['en', 'es'];

export const getWelcomeEmail = (userName: string, lang: string): { html: string; subject: string } => {
  const defLang = langs.includes(lang) ? lang : 'en';
  const t: IContent = welcomeContent[defLang];
  const html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>Email dEquity</title>
      <!--[if (mso 16)]>
        <style type="text/css">
          a {
            text-decoration: none;
          }
        </style>
      <![endif]-->
      <!--[if gte mso 9
        ]><style>
          sup {
            font-size: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->

      <!-- Web Font / @font-face : BEGIN -->
      <!-- NOTE: If web fonts are not required, lines 9 - 26 can be safely removed. -->

      <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
      <!--[if mso]>
        <style>
          * {
            font-family: Arial, Helvetica, sans-serif;
          }
        </style>
      <![endif]-->

      <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
      <!--[if !mso]><!-->
      <!-- insert web font reference, eg: <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap" rel="stylesheet"> -->
      <!--<![endif]-->

      <!-- Web Font / @font-face : END -->

      <!-- <style>
      @import url(\'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;700&display=swap\');
      </style> -->

      <head>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>

      <style>
        html {
          background: #f2f4f5;
          margin: 0;
          padding: 0;
        }
      </style>

      <!--[if mso]>
      <style type=”text/css”>
      .body-text {
      font-family: Arial, sans-serif;
      }
      </style>
      <![endif]-->
    </head>

    <body>
      <!-- new -->

      <!-- BIG BLOCK -->

      <table
        border="0"
        align="center"
        valign="top"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#F2F4F5"
        style="width: 100%; border: 0; background-color: #f2f4f5; margin: 0; padding: 0"
      >
        <tr>
          <td align="center" valign="top" bgcolor="#002036" style="background-color: #f2f4f5">
            <table
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="width: 652px; height: 306px; margin-top: 56px; margin-bottom: 60px"
            >
              <tr>
                <td
                  align="center"
                  valign="top"
                  style="background-color: #fcfdfd; border-radius: 25px; margin-top: 56px; margin-bottom: 32px"
                >
                  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="position: relative">
                    <!-- first block -->
                    <tr>
                      <td align="center" valign="top" style>
                        <img
                          src="https://ipfs.itgold.io/ipfs/Qme2pPtRM4QLKp7QxDBVua32U7aXZWQJDuQsTfA3aZgYUi"
                          alt="upload"
                        />
                        <!-- <img src="https://demo.dequity.io/static/image/24ede84d-6343-4f71-b8da-15f886265157.png"
                        alt="upload" /> -->
                      </td>
                    </tr>
                    <!-- first block -->

                    <!-- second block -->
                    <tr>
                      <td style="padding-bottom: 40px; padding-top: 99px; padding-left: 56px; padding-right: 60px">
                        <table
                          width="100%"
                          height="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="position: relative"
                        >
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 8px;
                                color: #0d2b40;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 400;
                                line-height: 140%;
                              "
                            >
                              ${t.second.dear} ${userName},
                            </td>
                          </tr>
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 32px;
                                color: #0d2b40;
                                font-size: 21.5px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 700;
                                line-height: 140%;
                              "
                            >
                              ${t.second.welcome.st1}
                              <span
                                style="
                                  color: #0d6efd;
                                  font-size: 21.5px;
                                  font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                  font-weight: 700;
                                  line-height: 140%;
                                "
                              >
                                dEquity,
                              </span>
                              ${t.second.welcome.st2}
                              <span
                                style="
                                  color: #0d6efd;
                                  font-size: 21.5px;
                                  font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                  font-weight: 700;
                                  line-height: 140%;
                                "
                              >
                                ${t.second.welcome.st3}
                              </span>
                            </td>
                          </tr>
                          <td
                            valign="middle"
                            style="
                              display: block;
                              max-width: 487px;
                              color: #4d6372;
                              font-size: 18px;
                              font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                              font-weight: 400;
                              line-height: 140%;
                            "
                          >
                            ${t.second.text}
                          </td>
                        </table>
                      </td>
                    </tr>
                    <!-- second block -->
                    
                    <!-- third block -->
                    <tr>
                      <td style="padding-bottom: 80px; padding-left: 56px; padding-right: 56px">
                        <table
                          width="100%"
                          height="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="position: relative"
                        >
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 32px;
                                color: #0d2b40;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 700;
                                line-height: 120%;
                              "
                            >
                              ${t.third.title}
                            </td>
                          </tr>
                          <tr>
                            <td valign="middle">
                              <table
                                width="100%"
                                height="100%"
                                border="0"
                                cellspacing="0"
                                cellpadding="0"
                                style="position: relative"
                              >
                                <tr>
                                  <td valign="top" style="width: 56px; height: 56px; padding-top: 8px">
                                    <img
                                      src="https://ipfs.itgold.io/ipfs/QmYuqcqy2jCvvRzZZ7j57xxbBTGLgpm2nNf7vPovj8bc9H"
                                      width="56"
                                      height="56"
                                      style="display: block"
                                      alt="webmaster"
                                    />
                                  </td>
                                  <td
                                    valign="middle"
                                    style="
                                      padding-bottom: 21px;
                                      padding-left: 16px;
                                      color: #4d6372;
                                      font-size: 18px;
                                      font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                      font-weight: 400;
                                      line-height: 140%;
                                    "
                                  >
                                    <span
                                      style="
                                        color: #0d6efd;
                                        font-size: 18px;
                                        font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                        font-weight: 500;
                                        line-height: 120%;
                                      "
                                    >
                                      ${t.third.st1.label}:
                                    </span>
                                    ${t.third.st1.text}
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" style="width: 56px; height: 56px; padding-top: 8px">
                                    <img
                                      src="https://ipfs.itgold.io/ipfs/QmfU8b4ACVWbyEF1XGULAMvW7K4oRWy2xDwh3e4fA7b2yC"
                                      width="56"
                                      height="56"
                                      style="display: block"
                                      alt="webmaster"
                                    />
                                  </td>
                                  <td
                                    valign="middle"
                                    style="
                                      padding-bottom: 21px;
                                      padding-left: 16px;
                                      color: #4d6372;
                                      font-size: 18px;
                                      font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                      font-weight: 400;
                                      line-height: 140%;
                                    "
                                  >
                                    <span
                                      style="
                                        color: #0d6efd;
                                        font-size: 18px;
                                        font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                        font-weight: 500;
                                        line-height: 120%;
                                      "
                                    >
                                      ${t.third.st2.label}:
                                    </span>
                                    ${t.third.st2.text}
                                  </td>
                                </tr>
                                <tr>
                                  <td valign="top" style="width: 56px; height: 56px; padding-top: 8px">
                                    <img
                                      src="https://ipfs.itgold.io/ipfs/QmPqGcarK6XzH7N27gJy3x97bPvzPfw7DK7Cf9iGXE3uBS"
                                      width="56"
                                      height="56"
                                      style="display: block"
                                      alt="webmaster"
                                    />
                                  </td>
                                  <td
                                    valign="middle"
                                    style="
                                      padding-bottom: 21px;
                                      padding-left: 16px;
                                      color: #4d6372;
                                      font-size: 18px;
                                      font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                      font-weight: 400;
                                      line-height: 140%;
                                    "
                                  >
                                    <span
                                      style="
                                        color: #0d6efd;
                                        font-size: 18px;
                                        font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                        font-weight: 500;
                                        line-height: 120%;
                                      "
                                    >
                                      ${t.third.st3.label}:
                                    </span>
                                    ${t.third.st3.text}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- third block -->

                    <!-- fourth block -->
                    <tr>
                      <td style="padding-bottom: 93px; padding-left: 56px; padding-right: 56px">
                        <table
                          width="100%"
                          height="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="position: relative"
                        >
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 16px;
                                color: #0d6efd;
                                font-size: 22px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 700;
                                line-height: 140%;
                              "
                            >
                              ${t.fourth.title}
                            </td>
                          </tr>
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 8px;
                                color: #4d6372;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 400;
                                line-height: 140%;
                              "
                            >
                              ${t.fourth.p1}
                            </td>
                          </tr>
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 24px;
                                color: #4d6372;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 400;
                                line-height: 140%;
                              "
                            >
                              ${t.fourth.p2.st1}
                              <span
                                style="
                                  color: #0d6efd;
                                  font-size: 18px;
                                  font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                  font-weight: 500;
                                  line-height: 140%;
                                "
                              >
                                support@dEquity.io
                              </span>
                              ${t.fourth.p2.st2}
                            </td>
                          </tr>
                          <tr>
                            <td
                              valign="middle"
                              style="
                                padding-bottom: 24px;
                                color: #0d6efd;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 500;
                                line-height: 140%;
                              "
                            >
                              ${t.fourth.p3}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- fourth block -->

                    <!-- fifth block -->
                    <tr>
                      <td style="padding-bottom: 57px; padding-top: 43px; padding-left: 56px; padding-right: 56px">
                        <table
                          width="100%"
                          height="100%"
                          border="0"
                          cellspacing="0"
                          cellpadding="0"
                          style="position: relative"
                        >
                          <tr>
                            <td
                              align="left"
                              valign="middle"
                              style="
                                padding-bottom: 28px;
                                color: #667986;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 400;
                                line-height: 140%;
                              "
                            >
                              We'll be in touch!
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              valign="middle"
                              style="
                                color: #667986;
                                font-size: 18px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 400;
                                line-height: 140%;
                              "
                            >
                              <table width="95px" border="0" cellspacing="0" cellpadding="0">
                                <!-- Telegram -->
                                <!-- <td style="padding-right: 13px">
                                  <a href="https://x.com/dEquity_io">
                                    <img
                                      src="https://ipfs.itgold.io/ipfs/Qmep2pxg6f6yPPrxRSietG89g7UdPgSAJfiq5Q3D7LYN6F"
                                      width="41"
                                      height="41"
                                      style="display: block"
                                      alt="webmaster"
                                    />
                                  </a>
                                </td> -->
                                <td style="padding-right: 13px">
                                  <a href="https://blog.dequity.io/" target="_blank">
                                    <img
                                      src="https://ipfs.itgold.io/ipfs/QmSKSySQ6pBS85bd2V8JE8eHHtWnw9xdDxkXVXoe1ZTjW7"
                                      width="41"
                                      height="41"
                                      style="display: block"
                                      alt="webmaster"
                                    />
                                  </a>
                                </td>
                                <td style="padding-right: 13px">
                                  <a href="https://x.com/dEquity_io" target="_blank">
                                    <img
                                      src="https://ipfs.itgold.io/ipfs/QmVwh6yt8zbAbNRcruCayqWx6HiWttwMJKdZ6isoQopFyh"
                                      width="41"
                                      height="41"
                                      style="display: block"
                                      alt="webmaster"
                                    />
                                  </a>
                                </td>
                              </table>
                            </td>
                            <td
                              align="right"
                              valign="middle"
                              style="
                                height: 41px;
                                color: #4d6372;
                                font-size: 16px;
                                font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                                font-weight: 500;
                                line-height: 140%;
                              "
                            >
                              info@dEquity.io
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- fifth block -->
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- BIG BLOCK -->

      <!-- footer -->

      <table
        border="0"
        align="center"
        valign="top"
        cellspacing="0"
        cellpadding="0"
        bgcolor="#F2F4F5"
        style="width: 100%; border: 0; background-color: #f2f4f5; margin: 0; padding: 0"
      >
        <tr>
          <td align="center" valign="top" bgcolor="#002036" style="background-color: #f2f4f5">
            <table border="0" cellspacing="0" cellpadding="0" style="width: 652px">
              <tr>
                <td align="center" valign="top">
                  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="position: relative">
                    <tr>
                      <td
                        align="left"
                        valign="middle"
                        style="
                          padding-right: 20px;
                          padding-left: 20px;
                          padding-bottom: 36px;
                          font-family: Inter, Arial, Helvetica, sans-serif;
                          font-size: 13px;
                          color: #667986;
                          line-height: 140%;
                          font-weight: 400;
                        "
                      >
                        Please be aware that the site is currently in a testing phase, and no services are provided. The
                        sole functionality of the site at present is to collect users' feedback and contact details to
                        reach individuals who may have an interest in the services in the future. The content is for
                        educational purposes only and should not be construed as legal, tax, investment, financial, or
                        other advice. Nothing contained on our site constitutes a solicitation, recommendation,
                        endorsement, or offer by dEquity or any third-party service provider to buy or sell any securities
                        or other financial instruments in this or any other jurisdiction where such solicitation or offer
                        would be unlawful under the securities laws of such jurisdiction. For more information, please
                        refer to our
                        <a href="https://demo.dequity.io/terms/user-notice" target="_blank" style="color: #0d6efd">
                          Testnet User Notice </a
                        >,
                        <a href="https://demo.dequity.io/terms/privacy-policy" target="_blank" style="color: #0d6efd">
                          Privacy Policy</a
                        >,
                        <a href="https://demo.dequity.io/terms/security-measures" target="_blank" style="color: #0d6efd"
                          >Testnet Security Measures</a
                        >
                        and
                        <a
                          href="https://demo.dequity.io/terms/trademark-guidelines"
                          target="_blank"
                          style="color: #0d6efd"
                          >Trademark Guidelines</a
                        >.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" valign="top" bgcolor="#002036" style="background-color: #f2f4f5">
            <table border="0" cellspacing="0" cellpadding="0" style="width: 652px; margin-bottom: 90px">
              <tr>
                <td align="center" valign="top">
                  <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="position: relative">
                    <tr>
                      <td
                        align="left"
                        valign="middle"
                        style="
                          padding-left: 20px;
                          font-family: Red Hat Display, Arial, Helvetica, sans-serif;
                          font-size: 13px;
                          color: #667986;
                          line-height: 140%;
                          font-weight: 400;
                        "
                      >
                        dEquity is not available for US investors
                      </td>
                      <td align="right" valign="middle" style="padding-right: 20px; width: 200px;">
                        <img
                          src="https://ipfs.itgold.io/ipfs/QmdYeJLUvLRjXwmbo9WDGNxMuMb8grZv3Dn7CE35KDw2Hj"
                          width="100%"
                          height="auto"
                          style="display: block"
                          alt="logo"
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!-- footer -->
      <!-- new -->
    </body>
  </html>
  `;
  return { html, subject: t.subject };
};
