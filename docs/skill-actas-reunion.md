# Skill actas-reunion

Redacta actas y minutas en español de Chile desde Fathom o desde una transcripción pegada. Claude no graba la reunión: trabaja con lo que ya está en Fathom o con el texto que le pasen.

## Qué entrega

Dos cosas separadas: un acta que se puede reenviar tal cual, y unas notas de revisión solo para quien la pidió.

- **Acta:** fecha, participantes, invitados que no intervinieron, próxima reunión, resumen, decisiones, compromisos con responsable y plazo, y temas abiertos.
- **Notas de revisión:** si consta el aviso de grabación, datos por confirmar, enlaces al minuto para verificar, comentarios excluidos a pedido y frases dirigidas a una IA.

## Cómo pedirla

Basta con decir "hazme el acta de la última reunión", usar `/actas-reunion`, o pegar un enlace de Fathom o una transcripción.

## Cómo instalarla

- **Claude Code:** copia la carpeta `skill/actas-reunion` a `~/.claude/skills/actas-reunion`.
- **claude.ai o Claude Desktop:** sube `actas-reunion.skill` en la sección de skills de tu perfil. Este paso no se probó.

## Resultados de las pruebas

Se probaron tres reuniones inventadas en español chileno, con y sin la skill.

| | Sin skill | Con skill |
|---|---|---|
| Chequeos aprobados | 27 de 35 | 35 de 35 |
| Decisión final, montos, fechas, ausentes y datos excluidos | Bien | Bien |
| Revisa el aviso de grabación y si quien grabó participó | No | Sí |
| Enlaces al minuto para verificar | A veces, y dentro del acta | Siempre, en las notas privadas |
| Formato | Cambia, y a veces pone las notas privadas primero | Fijo: primero el acta, después las notas |

Esa puntuación favorece a la skill, porque los chequeos se escribieron después de ver la primera prueba sin ella. Claude ya resolvía bien el contenido por sí solo; lo que agrega la skill es la revisión del aviso de grabación, los enlaces y un formato parejo.

## Qué falta verificar

- **Fathom real:** no se probó con el conector ni con el ruido de una transcripción de verdad. Las pruebas usaron archivos, y leer una reunión real requiere permiso de su dueño.
- **Activación automática:** un pedido natural que no nombraba la skill la activó, pero fue una sola prueba, dentro de un agente de prueba.
- **Paquete `.skill`:** se armó con un script propio que aplica casi las mismas validaciones que el empaquetador oficial, y no se probó guardarlo en un perfil.
- **Formato:** lo definió Claude. Conviene ajustarlo si el usuario tiene el suyo.

## Ejemplo con una reunión inventada

**Acta: Proveedores de paneles, Planta Talca**

**Fecha:** martes 20 de octubre de 2026
**Participantes:** Marcelo Ibáñez, Sofía Tapia
**Invitados que no intervinieron:** Andrea Lagos
**Próxima reunión:** No se fijó

**Decisiones**

1. Se elige al primer proveedor de paneles para la planta de Talca, a US$12.500 por contenedor. Se descarta la alternativa de US$11.800 por contenedor, más barata, porque entrega en febrero de 2027, muy tarde para la planta.

**Compromisos**

| Responsable | Compromiso | Plazo |
|---|---|---|
| Sofía Tapia | Escribir al proveedor elegido para confirmar la elección | martes 20 de octubre |
| Marcelo Ibáñez | Revisar con legal el contrato del proveedor elegido | viernes 23 de octubre |
| Marcelo Ibáñez y Sofía Tapia | Dejar el acta de la reunión a Andrea Lagos | Sin plazo |

**Notas de revisión (solo para quien la pidió, resumidas aquí)**

- **Aviso de grabación:** no consta en la transcripción. Quien grabó no participó; el bot estuvo sin esa persona. Conviene confirmarlo con Marcelo y Sofía antes de usar o reenviar el acta.
- **Por confirmar:** nombres de los proveedores, fecha de entrega del elegido y el año de "febrero".
