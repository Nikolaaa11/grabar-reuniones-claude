# Paso a paso: cómo grabar y cómo confirmar que está grabando

Revisado el 2 de noviembre de 2026. Los pasos vienen de las ayudas de cada producto y no se ejecutaron en un PC, así que algún botón puede llamarse distinto. Los de OBS (`Stop Recording`, `Show Recordings`) y los de Notas de Voz son de memoria. Por eso la prueba de 2 minutos es lo que da seguridad real.

## Control para cualquier método

Un grabador encendido no garantiza que esté captando a todos. Revisa tres momentos:

1. **Antes:** haz una prueba de 2 minutos. Si graba en tu PC, ponte audífonos, reproduce un video con voz y habla encima; al escuchar la prueba deben oírse ambas cosas.
2. **Durante:** en los primeros 2 minutos, busca la señal de cada método.
3. **Después:** revisa el principio, el medio y el final, y confirma que aparezcan los demás y no solo tú.

Antes de partir, avisa y pide un sí de cada persona; un bot visible no reemplaza ese aviso. Si la reunión es importante, usa dos métodos a la vez.

## 1. Fathom con bot (la recomendación)

Es gratis. Claude lee el resultado, pero no inicia la grabación.

1. En [Settings](https://help.fathom.video/en/articles/3239617), conecta Zoom, Meet o Teams, además de [tu calendario](https://help.fathom.video/en/articles/276608). En Zoom, [conectar tu cuenta es obligatorio](https://help.fathom.video/en/articles/688704) si no usas su versión nueva, que hoy es [solo para Mac](https://help.fathom.video/en/articles/11577345-how-does-bot-free-recording-work-in-fathom-3-0).
2. En el primer desplegable de Settings, elige qué se graba solo: `All Meetings`, `External Meetings` o `Internal Meetings`. Con `No Meetings` partes a mano.
3. Antes de la reunión, abre la [app de escritorio](https://help.fathom.video/en/articles/449088) con tu sesión iniciada. Si no detecta la reunión, pega ahí el enlace.

- **Señal:** `Fathom Notetaker` aparece entre los participantes. Si queda en sala de espera, admítelo; hasta entonces no graba.
- **Después:** pídele a Claude "lista mis últimas reuniones de Fathom" y revisa la transcripción.
- **Si no entró:** [las causas más comunes](https://help.fathom.video/en/articles/13114369) son la app cerrada, la grabación automática apagada, un calendario sin conectar o un evento sin enlace web.

## 2. Meetily: gratis y sin bot, en tu PC

Úsalo cuando el bot no pueda entrar, con permiso del organizador.

1. Descarga la [versión Community para Windows](https://meetily.ai/blog/how-to-install-meetily). Si aparece SmartScreen, elige `More info` y `Run anyway`.
2. En Configuración de Windows → Privacidad → Micrófono, permite Meetily.
3. En Meetily, [elige tu micrófono y activa el audio del sistema](https://meetily.ai/blog/how-to-install-meetily-complete-desktop-setup-guide). Para español, usa Whisper y selecciona `es`.
4. Aprieta `Record` antes de entrar a la llamada.

- **Señal:** el medidor se mueve y el texto aparece en vivo, con tus frases y las de los demás.
- **Después:** [copia la transcripción](https://docs.meetily.ai/features/export-and-copy) y pégala en Claude.

## 3. OBS: respaldo en archivo

Solo graba; no transcribe.

1. Instala [OBS](https://obsproject.com/kb/quick-start-guide). Por defecto captura el audio del escritorio y tu micrófono.
2. En `Settings` → `Output`, usa [formato MKV](https://obsproject.com/kb/standard-recording-output-guide), que no pierde todo el archivo si algo falla.
3. Aprieta `Start Recording`.

- **Señal:** en `Audio Mixer` se mueve `Desktop Audio` cuando hablan los demás y `Mic/Aux` cuando hablas tú. El botón cambia a `Stop Recording`.
- **Después:** abre el archivo en `File` → `Show Recordings`. Claude no recibe audio, así que transcríbelo con [Vibe](https://github.com/thewh1teagle/vibe) y pega el texto.

Sin instalar nada, también sirve [Recortes](https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b), con `Windows + Shift + R`. El audio del sistema y el micrófono [se activan por separado](https://geekrewind.com/how-to-turn-include-system-audio-when-recording-on-or-off-with-snipping-tool-in-windows-11/), y graba silencio si tienes la salida de audio muda.

## 4. El botón de tu plataforma

| | Cómo iniciar | Señal | Dónde queda | Límites |
|---|---|---|---|---|
| [Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0076922) | `Record` → `Record on this Computer` | Indicador arriba a la izquierda | Carpeta de Zoom en tu PC; se abre al terminar de convertir | Anfitrión o con su permiso. Basic corta a los 40 minutos y no transcribe. No apagues ni cierres el notebook mientras convierte |
| [Meet](https://support.google.com/meet/answer/9308681?hl=es-419) | `Herramientas de reunión` → `Grabando` → `Iniciar grabación` → `Iniciar` | Aviso a todos | Carpeta `Google Meet` en el Drive del organizador, con correo y enlace | Requiere plan compatible; una cuenta gratis no graba. Guarda subtítulos solo si eliges idioma |
| [Teams](https://support.microsoft.com/en-us/office/record-a-meeting-in-microsoft-teams-34dfbe7f-b07d-4a27-b4c6-de62f1348c24) | `Más acciones` → `Grabar` → `Confirmar` | Aviso a todos | OneDrive del organizador y chat de la reunión | Requiere licencia de organización; los invitados no pueden grabar |

## 5. Circleback: app gratis sin bot

El historial gratis es de 30 días. Lee antes su política de datos, porque no se revisó.

1. Instala la [app de escritorio](https://circleback.ai/desktop).
2. En `Settings` → `Calendar`, [apaga las preferencias de unión](https://circleback.ai/blog/ai-notetakers-without-a-bot) para que no mande un bot, y deja encendido `Detect meetings`.
3. Cuando la reunión use tu micrófono, acepta el aviso para grabar.

- **Señal:** no se encontró un indicador documentado, así que aquí la prueba de 2 minutos es indispensable.

## 6. Celular para reuniones presenciales

Déjalo al centro de la mesa. En la prueba, habla desde el extremo más lejano y escucha el resultado. El contador debe avanzar durante toda la reunión.

- **iPhone 12 o superior:** usa Notas de Voz. Transcribe en español, pero [Apple advierte que no está en todos los países](https://support.apple.com/guide/iphone/view-a-transcription-iph00953a982/ios) y no se confirmó Chile.
- **Samsung con Galaxy AI:** graba en [Grabadora de voz](https://www.samsung.com/us/support/answer/ANS10000942/). Al terminar, usa `Transcript assist` → `Transcribe` y comparte como `Text file`. Chile no aparece entre sus variantes de español, así que prueba con México.
- **Pixel 6 o superior:** usa la [Grabadora de Google](https://support.google.com/pixelphone/answer/16267698?hl=en), que incluye español de Latinoamérica.

## 7. Que Claude mande el bot o inicie la grabación

**[MeetNotes](https://getmeetnotes.com/mcp) (100 minutos gratis):**

1. Crea en Claude un conector personalizado con `https://getmeetnotes.com/mcp` e inicia sesión.
2. Pega el enlace de la reunión y pide que se una.
3. Busca `MeetNotes Notetaker` entre los participantes; el anfitrión debe admitirlo.

Su nivel en el directorio es community, así que no conviene usarlo en reuniones sensibles.

**[Minutes](https://claude.com/marketplace/connectors/minutes-conversation-memory) (gratis):** úsalo solo en prueba, porque su documentación no describe cómo captar el audio de una llamada en Windows. Pídele a Claude que inicie una grabación y haz la prueba con audífonos. Si en el texto solo apareces tú, capta únicamente tu micrófono y no sirve para llamadas.
