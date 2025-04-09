function showContent(section) {
    var contentText = document.getElementById("contentText");

    switch (section) {
        /* case 1:
            contentText.innerHTML = `
            <h2>Introducción</h2>
            <p>Proporcionar a las instituciones financieras una API con la cual puedan dar cumplimiento al envío de los archivos correspondientes a REUNE y REDECO.</p>
            `;
             break;

        case 2:
            contentText.innerHTML = `
            <h2>Objetivo del documento</h2>
            <p>Establecer los endpoints en los cuales las instituciones financieras podrán realizar el envío de datos en formato json.</p>
            <h3>Ámbito de aplicación, responsables y obligaciones</h3>
            <p>Las disposiciones contenidas en este documento son de observancia obligatoria para los servidores públicos adscritos a la Dirección de Tecnologías de Información y Comunicaciones, y áreas cuyas actividades se apoyan en instrumentar, desarrollar, administrar y coordinar sistemas informáticos, para ésta Comisión Nacional.</p>
            `;
            break;

        case 3:
            contentText.innerHTML = `
            <h2>Marco jurídico-administrativo</h2>
            <ol>
                <li>
                    <h3>Ordenamientos de Tipo Legislativo</h3>
                </li>
                <ul>
                    <li>Ley de Protección y Defensa al Usuario de Servicios Financieros</li>
                    <li>Ley para Regular las Instituciones de Tecnología Financiera </li>
                </ul> 
                
                <li>
                    <h3>Ordenamientos de Alcance General</h3>
                </li> 
                <p><strong>Acuerdos</strong></p>
                <p>Acuerdo que tiene por objeto emitir las políticas y disposiciones para la Estrategia Digital Nacional, en materia de tecnologías de la información y comunicaciones, y en la de seguridad de la información, así como establecer el Manual Administrativo de Aplicación General en dichas materias. </p>
                <p><strong>Estatutos</strong></p>
                <p>Estatuto Orgánico de la Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros. </p>
                <p><strong>Normas</strong></p>
                <p>Lineamientos para la aplicación y seguimiento de las medidas para el uso eficiente, transparente y eficaz de los recursos públicos y las acciones de disciplina presupuestaria en el ejercicio del gasto público, así como para la modernización de la Administración Pública Federal.</p>
            `
            break;
 */
        case 1:
            contentText.innerHTML = `
            
            <h2>Definiciones y acrónimos</h2>

            <p><strong>Estos son algunos de los términos que se utilizarán en esta guía:</strong></p>
        <div id="tbl-gral">
            <table>
                <tr>
                    <th>Término</th>
                    <th>Definición</th>
                </tr>
                <tr>
                    <td>API</td>
                    <td>Mecanismos que permiten a dos componentes de software comunicarse entre sí mediante un conjunto de definiciones y protocolos.</td>
                </tr>
                <tr>
                    <td>Host</td>
                    <td>Lugar en donde reside un sitio web que contiene una dirección IP con un nombre de dominio único.</td>
                </tr>
                <tr>
                    <td>Endpoint</td>
                    <td>Es la URL de una API o un backend que se encarga de contestar a una petición.</td>
                </tr>
                <tr>
                    <td>Json</td>
                    <td>Formato de intercambio de datos.</td>
                </tr>                        
            </table>  
        </div>
                                              
            `;
            break;
        case 2:
            contentText.innerHTML = `
            <h2>Catálogos</h2>
            <h3>Los catálogos deberán ser consultados en el sistema REUNE ingresando desde el PUR.</h3>
            <ul>
                <li><p>Producto y/o servicio - Causas o motivos</p></li>
                <li><p>Entidades Federativas, Código Postal, Delegación/Municipio, Localidad y Colonia (SEPOMEX)</p></li>
                <li><p>Medios de recepción o canal</p></li>
                <li><p>Niveles de atención</p></li>
                <li><p>Sentido de resolución</p></li>
                <li><p>Ramo (Exclusivamente sector Seguros)</p></li>
                <li><p>Instituciones Financieras (Exclusivamente sector SIC's)</p></li>
            </ul> 
            `;
            break;
        case 3:
                contentText.innerHTML = `
                <h2>Descripción de los procedimientos</h2>
                <h3>Para el uso de la API-REUNE es necesario considerar los siguientes aspectos:</h3>
                <ol>
                <h4>-El área de desarrollo de cada Institución Financieras deberá decidir la herramienta que utilizarán para establecer la comunicación con la API y puedan consumirla a manera de prueba. Algunos ejemplos son: Postman, Swagger, Mabl, Sandbox, Hurl, etc.</h4>
            
                <h4>-Se comparten los “endpoints” para la conexión y creación de usuarios (ambiente de pruebas):</h4>
                <p id="nota"><strong>NOTA: LOS SIGUIENTES EJEMPLOS DE PRUEBA SE REALIZARON CON LA HERRAMIENTA POSTMAN</strong></p>
            <ol class="d">
                <li>
                    <p><strong>Creación de Súper Usuario</strong></p>

                    <strong><span id="method-post">POST</span></strong> 

                    api-reune-pruebas.condusef.gob.mx/auth/users/create-super-user/
                            
                        <div>
                            <pre id="postman">
                                <code>
{
"key": "52439|27|23414|SI|NO",
"username": "superuserTEST",
"password": "1234",
"confirm_password": "1234"
}
                                </code>
                            </pre>
                        </div>

                        La estructura tendrá que tener el siguiente formato:
                        <div>
                            <pre id="postman">
                                <code>
{
"key": Corresponde al token que se proporciona en el acuse generado del portal REUNE.
"username": Nombre del súper usuario.
"password": Contraseña.
"confirm_password": Confirmar la contraseña.
}
                                </code>
                            </pre>
                        </div>        
                            Cuando se realice correctamente el envío de cada uno de los campos, obtendremos una respuesta que contiene el “token_access”:
                        <div>    
                            <pre id="postman">
                                <code>
{
"message": "El usuario ha sido creado exitosamente!",
"data": {
"userid": "fbbd9f4f-3cd1-413a-b958-2ec78f35c459",
"username": "superusertest",
"password": "$2a$10$x0N5M1qtIhkBkgjshuohQu/HvmGndog0vBRqYfhQAyAI.6ggr1Mee",
"institucionid": "D2FDFDFF-F622-4BDC-9ECB-BF7B3D62",
"is_active": "true",
"profileid": "2"
"token_access": "eyJhbGciOiJIUz"
}
}
                                </code>
                            </pre>                                        
                        </div>

                        <p>El "token_access" nos permitirá autenticar en cada uno de los endpoints.</p>

                </li>

                <li>
                    <p><strong>Creación de Usuario</strong></p>

                    <strong><span id="method-post">POST</span></strong> 

                    api-reune-pruebas.condusef.gob.mx/auth/users/create-user/

                    <p>En Headers daremos la autorizacion (Authorization) y deberá integrarse el token access que se generó.</p>

                    <table>
                        <tr>
                            <th></th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Authorization</td>
                            <td>(Token generado por usuario)</td>
                            <td></td>
                        </tr>                      
                    </table>    

                    <p>En body tendrémos los siguientes campos:</p>
                    
                        <div >
                            <pre id="postman">
                                <code>
{

    "username": "usertest_condusef01",
    "password": "1234",
    "confirm_password": "1234"

}
                                </code>
                            </pre>
                        </div>

                        <p>Conforme al ejemplo anterior, se deberá modificar cada campo de acuerdo al dato requerido</p>

                        <div >
                            <pre id="postman">
                                <code>
{

    "username": Nombre de usuario que tendrá acceso.
    "password": Contraseña.
    "confirm_password": Confirmar contraseña.

}
                                </code>
                            </pre>
                        </div>
                </li>

                <li>
                    <p><strong>Renovación del Token Acces</strong></p>
                    <strong><span id="method-get">GET</span></strong>
                    api-reune-pruebas.condusef.gob.mx/auth/users/token/
                    <p>En body tendrémos los siguientes campos:</p>
                    
                        <div >
                            <pre id="postman">
                                <code>
{

    "username": "superusertest",
    "password": "1234",

}
                                </code>
                            </pre>
                        </div>

                        <p>Conforme al ejemplo anterior, se deberá modificar cada campo de acuerdo al dato requerido</p>

                        <div >
                            <pre id="postman">
                                <code>
{

    "username": Nombre de usuario a quien se le realizará la renovación del token.
    "password": Contraseña asignada al usuario que se le realizará la renovación.

}
                                </code>
                            </pre>
                        </div>
                        Cuando se realice correctamente el envío de cada uno de los campos, obtendremos una respuesta que contiene el “token_access” renovado:
                        <div>    
                            <pre id="postman">
                                <code>
{
"msg": "Login exitoso!!!",
"user": {
    "token_access": "fbbd9f4f-3cd1-413a-b958-2ec78f35c459",
    "username": "superusertest",
}
}
                                </code>
                            </pre>                                        
                        </div>
                        NOTA: Todo token Access generado tiene una vigencia de 30 días naturales. Es responsabilidad de cada Institución Financiera hacer el resguardo de esta información.

                </li>

                
                <li>
                    <p><strong>Envío de consultas generales</strong></p>
                    <p>El siguiente endpoint se utilizará para consultas en los sectores con obligación al art. 50 Bis. de la LPDUSF 
                    con excepción de los sectores de Seguros y Sociedades de Información Crediticia correspondientes (ambiente de pruebas):</p>
                    <strong><span id="method-post">POST</span></strong>
                    api-reune-pruebas.condusef.gob.mx/reune/consultas/general
                    <p>En Headers daremos la autorizacion (Authorization) y deberá integrarse el token access que se generó.</p>

                    <table>
                        <tr>
                            <th></th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Authorization</td>
                            <td>(Token generado por usuario)</td>
                            <td></td>
                        </tr>                      
                    </table>    

                    <p>En body tendrémos los siguientes campos que componen el layout con el que la Institución financiera envía su información cada trimestre y tiene que estar en un arreglo json (los datos incorporados son de prueba, cada IF tiene que poner su información correspondiente):</p>
                    
                        <div>
                            <pre id="postman">
                                <code>
{
    "InstitucionClave": "CONDUSEF_EJEMPLO, S.A. de C.V., SOFOM, E.N.R.", 
    "Sector": "Sociedades Financieras de Objeto Múltiple E.N.R.",
    "ConsultasTrim": 1,
    "NumConsultas": 1,
    "ConsultasFolio": "REUNE_FOLIO1",
    "ConsultasEstatusCon": 1,
    "ConsultasFecAten": "17/03/2024",
    "EstadosId": 32,
    "ConsultasFecRecepcion": "16/03/2024",
    "MediosId": 14,
    "Producto": "026911811258",
    "CausaId": "0666",
    "ConsultasCP": 87070,
    "ConsultasMpioId": 10,
    "ConsultasLocId": 1,
    "ConsultasColId": 2,
    "ConsultascatnivelatenId": 1,
    "ConsultasPori": "SI"
}
                                </code>
                            </pre>
                        </div>

                        <p>Conforme al ejemplo anterior, se deberá modificar cada campo de acuerdo al dato requerido</p>

                        <div>
                            <pre id="postman">
                                <code>
{

    "InstitucionClave": Denominación o razón social
    "Sector": Sector
    "ConsultasTrim": Trimestre
    "NumConsultas": Número de consultas
    "ConsultasFolio": Número de Folio de atención
    "ConsultasEstatusCon": Estado de concluido o pendiente
    "ConsultasFecAten": Fecha de atención
    "EstadosId": Entidad federativa
    "ConsultasFecRecepcion": Fecha de consulta
    "MediosId": Medio de recepción o canal
    "Producto": Producto y/o servicio
    "CausaId": Causa o motivo
    "ConsultasCP": Código Postal,
    "ConsultasMpioId": Municipio o Alcaldía
    "ConsultasLocId": Localidad
    "ConsultasColId": Colonia
    "ConsultascatnivelatenId": Nivel de atención o contacto,
    "ConsultasPori": PORI
}
                               
            </ol>

        <h3>Diccionario de datos (Layout)</h3>
        <table>
            <tr>
                <th>Campo</th>
                <th>Descripción</th>
                <th>Tipo Dato</th>
                <th>Longitud máxima</th>
                <th>Dato requerido</th>
                <th>Información</th>
            </tr>
            <tr>
                <td>InstitucionClave</td>
                <td>Denominación o razón social</td>
                <td>Alfanumérico</td>
                <td>400</td>
                <td>SI</td>
                <td>Nombre de mi Institución Financiera.</td>
            </tr>
            <tr>
                <td>Sector</td>
                <td>Sector al que pertenece la IF</td>
                <td>Alfanumérico</td>
                <td>200</td>
                <td>SI</td>
                <td>Nombre del sector al que pertenece mi Institución Financiera.</td>
            </tr>
            <tr>
                <td>ConsultasTrim</td>
                <td>Trimestre a presentar</td>
                <td>Numérico</td>
                <td>1</td>
                <td>SI</td>
                <td>Número del trimestre en el que se presenta la información. </td>
            </tr>
            <tr>
                <td>NumConsultas</td>
                <td>Número de la consulta</td>
                <td>Numérico</td>
                <td>1</td>
                <td>SI</td>
                <td>De acuerdo a la disposición siempre es el valor de “1”</td>
            </tr>
            <tr>
                <td>ConsultasFolio</td>
                <td>Número de folio de atención</td>
                <td>Alfanumérico</td>
                <td>50</td>
                <td>SI</td>
                <td>Número de folio definido por la Institución Financiera.</td>
            </tr>
            <tr>
                <td>ConsultasEstatusCon</td>
                <td>Estado de concluido o Pendiente</td>
                <td>Numérico</td>
                <td>1</td>
                <td>SI</td>
                <td>Los valores permitidos son 1 o 2.</td>
            </tr>
            <tr>
                <td>ConsultasFecAten</td>
                <td>Fecha de atención</td>
                <td>Fecha</td>
                <td></td>
                <td>SI(De acuerdo al estado de concluido o pendiente)</td>
                <td>Debe de presentarse con la estructura dd/mm/aaaa</td>
            </tr>
            <tr>
                <td>EstadosId</td>
                <td>Entidad federativa</td>
                <td>Numérico</td>
                <td>2</td>
                <td>SI</td>
                <td>Número de la entidad federativa según el catálogo.</td>
            </tr>
            <tr>
                <td>ConsultasFecRecepcion</td>
                <td>Fecha de Consulta</td>
                <td>Fecha</td>
                <td></td>
                <td>SI</td>
                <td>Debe de presentarse con la estructura dd/mm/aaaa</td>
            </tr>
            <tr>
                <td>MediosId</td>
                <td>Medio de recepción o canal</td>
                <td>Numérico</td>
                <td>2</td>
                <td>SI</td>
                <td>Son los medios de recepción que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>Producto</td>
                <td>Producto y/o servicio</td>
                <td>Alfanumérico</td>
                <td>12</td>
                <td>SI</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>CausaId</td>
                <td>Causa o motivo</td>
                <td>Alfanumérico</td>
                <td>4</td>
                <td>SI</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasCP</td>
                <td>Código postal</td>
                <td>Numérico</td>
                <td>10</td>
                <td>SI (De acuerdo con el medio de recepción</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasMpioId</td>
                <td>Municipio</td>
                <td>Numérico</td>
                <td>8</td>
                <td>SI</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasLocId</td>
                <td>Localidad</td>
                <td>Numérico</td>
                <td>8</td>
                <td>Opcional</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasColId</td>
                <td>Colonia</td>
                <td>Numérico</td>
                <td>8</td>
                <td>Opcional</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultascatnivelatenId</td>
                <td>Nivel de atención o contacto</td>
                <td>Numérico</td>
                <td>2</td>
                <td>SI (De acuerdo al estado de concluido o pendiente)</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasPori</td>
                <td>PORI</td>
                <td>Alfanumérico</td>
                <td>2</td>
                <td>SI</td>
                <td>Los valores permitidos son “SI” y “NO”. Tiene que ser en mayúsculas.</td>
            </tr>
            
        </table>  
            `;
            break;

        case 4:
            contentText.innerHTML = `
            <h2>Descripción de los procedimientos</h2>
            
            <ol>
            <h4>*Este "endpoint" es exclusivamente para el sector de Seguros*</h4>
        
            
            <p id="nota"><strong>NOTA: EL SIGUIENTE EJEMPLO DE PRUEBA SE REALIZÓ CON LA HERRAMIENTA POSTMAN</strong></p>
            <ol class="d">
                
                <li>
                    <p><strong>Envío de consultas de seguros</strong></p>
                    
                    <strong><span id="method-post">POST</span></strong>
                    api-reune-pruebas.condusef.gob.mx/reune/consultas/seguros
                    <p>En Headers daremos la autorizacion (Authorization) y deberá integrarse el token access que se generó.</p>

                    <table>
                        <tr>
                            <th></th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Authorization</td>
                            <td>(Token generado por usuario)</td>
                            <td></td>
                        </tr>                      
                    </table>    

                    <p>En body tendrémos los siguientes campos que componen el layout con el que la Institución financiera envía su información cada trimestre y tiene que estar en un arreglo JSON (los datos incorporados son de prueba, cada IF tiene que poner su información correspondiente):</p>
                    
                        <div>
                            <pre id="postman">
                                <code>
        {
            "InstitucionClave": "CONDUSEF PRUEBA, S.A. de C.V.",
            "Sector": "Instituciones de Seguros",
            "Ramo": 25,
            "ConsultasTrim": 1,
            "NumConsultas": 1,
            "ConsultasFolio": "5323000263CUNE_CONDU",
            "ConsultasEstatusCon": 2,
            "ConsultasFecAten": "15/03/2024",
            "EstadosId": 28,
            "ConsultasFecRecepcion": "15/02/2024",
            "MediosId": 14,
            "Producto": "026911811258",
            "CausaId": "0666",
            "ConsultasCP": 87070,
            "ConsultasMpioId": 41,
            "ConsultasLocId": 1,
            "ConsultasColId": 230,
            "FolioCONDUSEF": "2023/090/1325",
            "ConsultascatnivelatenId": 1,
            "ConsultasPori": "SI"
        }
                                </code>
                            </pre>
                        </div>

                        <p>Conforme al ejemplo anterior, se deberá modificar cada campo de acuerdo al dato requerido</p>

                        <div>
                            <pre id="postman">
                                <code>
        {

            "InstitucionClave": Denominación o razón social
            "Sector": Sector
            "Ramo": Ramo
            "ConsultasTrim": Trimestre
            "NumConsultas": Número de consultas
            "ConsultasFolio": Número de Folio de atención
            "ConsultasEstatusCon": Estado de concluido o pendiente
            "ConsultasFecAten": Fecha de atención
            "EstadosId": Entidad federativa
            "ConsultasFecRecepcion": Fecha de consulta
            "MediosId": Medio de recepción o canal
            "Producto": Producto y/o servicio
            "CausaId": Causa o motivo
            "ConsultasCP": Código Postal,
            "ConsultasMpioId": Municipio o Alcaldía
            "ConsultasLocId": Localidad
            "ConsultasColId": Colonia
            "FolioCONDUSEF": Folio asignado por CONDUSEF
            "ConsultascatnivelatenId": Nivel de atención o contacto,
            "ConsultasPori": PORI

        }
                                
            </ol>
            <h3>Diccionario de datos (Layout)</h3>
        <table>
            <tr>
                <th>Campo</th>
                <th>Descripción</th>
                <th>Tipo Dato</th>
                <th>Longitud máxima</th>
                <th>Dato requerido</th>
                <th>Información</th>
            </tr>
            <tr>
                <td>InstitucionClave</td>
                <td>Denominación o razón social</td>
                <td>Alfanumérico</td>
                <td>400</td>
                <td>SI</td>
                <td>Nombre de mi Institución Financiera.</td>
            </tr>
            <tr>
                <td>Sector</td>
                <td>Sector al que pertenece la IF</td>
                <td>Alfanumérico</td>
                <td>200</td>
                <td>SI</td>
                <td>Nombre del sector al que pertenece mi Institución Financiera.</td>
            </tr>
            <tr>
                <td>Ramo</td>
                <td>Ramo al que pertenece la IF</td>
                <td>Numérico</td>
                <td>25</td>
                <td>SI</td>
                <td>Nombre del ramo al que pertenece la Institución Financiera.</td>
            </tr>
            <tr>
                <td>ConsultasTrim</td>
                <td>Trimestre a informar</td>
                <td>Numérico</td>
                <td>1</td>
                <td>SI</td>
                <td>Número del trimestre en el que se presenta la información. </td>
            </tr>
            <tr>
                <td>NumConsultas</td>
                <td>Número de la consulta</td>
                <td>Numérico</td>
                <td>1</td>
                <td>SI</td>
                <td>De acuerdo a la disposición siempre es el valor de “1”</td>
            </tr>
            <tr>
                <td>ConsultasFolio</td>
                <td>Número de folio de atención</td>
                <td>Alfanumérico</td>
                <td>50</td>
                <td>SI</td>
                <td>Número de folio definido por la Institución Financiera.</td>
            </tr>
            <tr>
                <td>ConsultasEstatusCon</td>
                <td>Estado de concluido o Pendiente</td>
                <td>Numérico</td>
                <td>1</td>
                <td>SI</td>
                <td>Los valores permitidos son 1 o 2.</td>
            </tr>
            <tr>
                <td>ConsultasFecAten</td>
                <td>Fecha de atención</td>
                <td>Fecha</td>
                <td></td>
                <td>SI(De acuerdo al estado de concluido o pendiente)</td>
                <td>Debe de presentarse con la estructura dd/mm/aaaa</td>
            </tr>
            <tr>
                <td>EstadosId</td>
                <td>Entidad federativa</td>
                <td>Numérico</td>
                <td>2</td>
                <td>SI</td>
                <td>Número de la entidad federativa según el catálogo.</td>
            </tr>
            <tr>
                <td>ConsultasFecRecepcion</td>
                <td>Fecha de Consulta</td>
                <td>Fecha</td>
                <td></td>
                <td>SI</td>
                <td>Debe de presentarse con la estructura dd/mm/aaaa</td>
            </tr>
            <tr>
                <td>MediosId</td>
                <td>Medio de recepción o canal</td>
                <td>Numérico</td>
                <td>2</td>
                <td>SI</td>
                <td>Son los medios de recepción que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>Producto</td>
                <td>Producto y/o servicio</td>
                <td>Alfanumérico</td>
                <td>12</td>
                <td>SI</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>CausaId</td>
                <td>Causa o motivo</td>
                <td>Alfanumérico</td>
                <td>4</td>
                <td>SI</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasCP</td>
                <td>Código postal</td>
                <td>Numérico</td>
                <td>10</td>
                <td>SI (De acuerdo con el medio de recepción</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasMpioId</td>
                <td>Municipio</td>
                <td>Numérico</td>
                <td>8</td>
                <td>SI</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasLocId</td>
                <td>Localidad</td>
                <td>Numérico</td>
                <td>8</td>
                <td>Opcional</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasColId</td>
                <td>Colonia</td>
                <td>Numérico</td>
                <td>8</td>
                <td>Opcional</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>FolioCONDUSEF</td>
                <td>Folio asignado por CONDUSEF</td>
                <td>Alfanumérico</td>
                <td>50</td>
                <td>SI (De acuerdo con el medio de recepción)</td>
                <td>Es el Número de Folio que asigna CONDUSEF.</td>
            </tr>
            <tr>
                <td>ConsultascatnivelatenId</td>
                <td>Nivel de atención o contacto</td>
                <td>Numérico</td>
                <td>2</td>
                <td>SI (De acuerdo al estado de concluido o pendiente)</td>
                <td>Son los valores que se encuentran en los catálogos.</td>
            </tr>
            <tr>
                <td>ConsultasPori</td>
                <td>PORI</td>
                <td>Alfanumérico</td>
                <td>2</td>
                <td>SI</td>
                <td>Los valores permitidos son “SI” y “NO”. Tiene que ser en mayúsculas.</td>
            </tr>
            
        </table>  
            `;
            break;

            case 5:
                contentText.innerHTML = `
                <h2>Descripción de los procedimientos</h2>
                
                <ol>
                <h4>*Este "endpoint" es exclusivamente para el sector de Sociedades de Información Crediticia (SIC's)*</h4>
            
                
                <p id="nota"><strong>NOTA: EL SIGUIENTE EJEMPLO DE PRUEBA SE REALIZÓ CON LA HERRAMIENTA POSTMAN</strong></p>
                <ol class="d">
                    
                    <li>
                        <p><strong>Envío de consultas de SIC's</strong></p>
                        
                        <strong><span id="method-post">POST</span></strong>
                        api-reune-pruebas.condusef.gob.mx/reune/consultas/sic
                        <p>En Headers daremos la autorizacion (Authorization) y deberá integrarse el token access que se generó.</p>
    
                        <table>
                            <tr>
                                <th></th>
                                <th>Key</th>
                                <th>Value</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Authorization</td>
                                <td>(Token generado por usuario)</td>
                                <td></td>
                            </tr>                      
                        </table>    
    
                        <p>En body tendrémos los siguientes campos que componen el layout con el que la Institución financiera envía su información cada trimestre y tiene que estar en un arreglo JSON (los datos incorporados son de prueba, cada IF tiene que poner su información correspondiente):</p>
                        
                            <div>
                                <pre id="postman">
                                    <code>
            {
                "InstitucionClave": "CONDUSEF PRUEBA, S.A. de C.V.",
                "Sector": "Sociedades de Información Crediticia",
                "ConsultasTrim": 1,
                "NumConsultas": 1,
                "ConsultasFolio": "REUNE_FOLIO1",
                "ConsultasEstatusCon": 2,
                "ConsultasFecAten": "16/03/2024",
                "EstadosId": 32,
                "ConsultasFecRecepcion": "16/03/2024",
                "MediosId": 6,
                "TipoReporte": 1,
                "ClaveSIPRES": 15198,
                "TipoPersona": 1,
                "ConsultasCP": 87070,
                "ConsultasMpioId": 10,
                "ConsultasLocId": 1,
                "ConsultasColId": 2,
                "ConsultascatnivelatenId": 1
            }
                                    </code>
                                </pre>
                            </div>
    
                            <p>Conforme al ejemplo anterior, cada campo debe modificarse según los datos correspondientes al Layout con el cual la Institución Financiera envía su información trimestralmente, y estos datos deben estar presentes en un arreglo JSON.</p>
    
                            <div>
                                <pre id="postman">
                                    <code>
            {
    
                "InstitucionClave": Denominación o razón social
                "Sector": Sector
                “ConsultasTrim”: Trimestre
                "NumConsultas": Número de consultas
                "ConsultasFolio": Número de Folio de atención
                "ConsultasEstatusCon ": Estado de concluido o pendiente
                "ConsultasFecAten ": Fecha de atención
                "EstadosId ": Entidad federativa
                "ConsultasFecRecepcion ": Fecha de consulta
                "MediosId": Medio de recepción o canal
                "TipoReporte": Tipo de Reportes
                "ClaveSIPRES": Clave SIPRES
                "TipoPersona": Tipo de Persona (Física o Moral)
                “ConsultasCP”: Código Postal
                "ConsultasMpioId": Municipio o Alcaldía
                "ConsultasLocId": Localidad
                "ConsultasColId": Colonia
                "ConsultascatnivelatenId": Nivel de atención o contacto

            }
                                    
                </ol>
                <h3>Diccionario de datos (Layout)</h3>
            <table>
                <tr>
                    <th>Campo</th>
                    <th>Descripción</th>
                    <th>Tipo Dato</th>
                    <th>Longitud máxima</th>
                    <th>Dato requerido</th>
                    <th>Información</th>
                </tr>
                <tr>
                    <td>InstitucionClave</td>
                    <td>Denominación o razón social</td>
                    <td>Alfanumérico</td>
                    <td>400</td>
                    <td>SI</td>
                    <td>Nombre de mi Institución Financiera.</td>
                </tr>
                <tr>
                    <td>Sector</td>
                    <td>Sector al que pertenece la IF</td>
                    <td>Alfanumérico</td>
                    <td>200</td>
                    <td>SI</td>
                    <td>Nombre del sector al que pertenece mi Institución Financiera.</td>
                </tr>
                <tr>
                    <td>ConsultasTrim</td>
                    <td>Trimestre a informar</td>
                    <td>Numérico</td>
                    <td>1</td>
                    <td>SI</td>
                    <td>Número del trimestre en el que se presenta la información. </td>
                </tr>
                <tr>
                    <td>NumConsultas</td>
                    <td>Número de la consulta</td>
                    <td>Numérico</td>
                    <td>1</td>
                    <td>SI</td>
                    <td>De acuerdo a la disposición siempre es el valor de “1”</td>
                </tr>
                <tr>
                    <td>ConsultasFolio</td>
                    <td>Número de folio de atención</td>
                    <td>Alfanumérico</td>
                    <td>50</td>
                    <td>SI</td>
                    <td>Número de folio definido por la Institución Financiera.</td>
                </tr>
                <tr>
                    <td>ConsultasEstatusCon</td>
                    <td>Estado de concluido o Pendiente</td>
                    <td>Numérico</td>
                    <td>1</td>
                    <td>SI</td>
                    <td>Los valores permitidos son 1 o 2.</td>
                </tr>
                <tr>
                    <td>ConsultasFecAten</td>
                    <td>Fecha de atención</td>
                    <td>Fecha</td>
                    <td></td>
                    <td>SI(De acuerdo al estado de concluido o pendiente)</td>
                    <td>Debe de presentarse con la estructura dd/mm/aaaa</td>
                </tr>
                <tr>
                    <td>EstadosId</td>
                    <td>Entidad federativa</td>
                    <td>Numérico</td>
                    <td>2</td>
                    <td>SI</td>
                    <td>Número de la entidad federativa según el catálogo.</td>
                </tr>
                <tr>
                    <td>ConsultasFecRecepcion</td>
                    <td>Fecha de Consulta</td>
                    <td>Fecha</td>
                    <td></td>
                    <td>SI</td>
                    <td>Debe de presentarse con la estructura dd/mm/aaaa</td>
                </tr>
                <tr>
                    <td>MediosId</td>
                    <td>Medio de recepción o canal</td>
                    <td>Numérico</td>
                    <td>2</td>
                    <td>SI</td>
                    <td>Son los medios de recepción que se encuentran en los catálogos.</td>
                </tr>
                <tr>
                    <td>TipoReporte</td>
                    <td>Tipo de Reporte</td>
                    <td>Numérico</td>
                    <td>1</td>
                    <td>SI</td>
                    <td>Solo valores permitidos (1 o 2.)</td>
                </tr>
                <tr>
                    <td>ClaveSIPRES</td>
                    <td>Clave SIPRES</td>
                    <td>Numérico</td>
                    <td>8</td>
                    <td>SI (De acuerdo al medio de recepción)</td>
                    <td>Clave SIPRES de la Institución Financiera..</td>
                </tr>
                <tr>
                    <td>TipoPersona</td>
                    <td>Tipo de Persona</td>
                    <td>Numérico</td>
                    <td>1</td>
                    <td>SI</td>
                    <td>Solo valores permitidos.
                        1 = Física.
                        2 = Moral.
                    </td>
                </tr>
                <tr>
                    <td>ConsultasCP</td>
                    <td>Código postal</td>
                    <td>Numérico</td>
                    <td>10</td>
                    <td>SI (De acuerdo con el medio de recepción</td>
                    <td>Son los valores que se encuentran en los catálogos.</td>
                </tr>
                <tr>
                    <td>ConsultasMpioId</td>
                    <td>Municipio</td>
                    <td>Numérico</td>
                    <td>8</td>
                    <td>SI</td>
                    <td>Son los valores que se encuentran en los catálogos.</td>
                </tr>
                <tr>
                    <td>ConsultasLocId</td>
                    <td>Localidad</td>
                    <td>Numérico</td>
                    <td>8</td>
                    <td>Opcional</td>
                    <td>Son los valores que se encuentran en los catálogos.</td>
                </tr>
                <tr>
                    <td>ConsultasColId</td>
                    <td>Colonia</td>
                    <td>Numérico</td>
                    <td>8</td>
                    <td>Opcional</td>
                    <td>Son los valores que se encuentran en los catálogos.</td>
                </tr>
                <tr>
                    <td>ConsultascatnivelatenId</td>
                    <td>Nivel de atención o contacto</td>
                    <td>Numérico</td>
                    <td>2</td>
                    <td>SI (De acuerdo al estado de concluido o pendiente)</td>
                    <td>Son los valores que se encuentran en los catálogos.</td>
                </tr>
             
                
            </table>  
                `;
                break;
    
        case 6:
            contentText.innerHTML = `
            <h2>Consideraciones generales</h2>
            <p>1.   El presente manual se encuentra alineado al ACUERDO por el que se modifican las políticas y disposiciones para la Estrategia Digital Nacional, en materia de Tecnologías de la Información y Comunicaciones,
             y en la de Seguridad de la Información, así como el Manual Administrativo de Aplicación General en dichas materias.</p>
            <p>2.	Todos los anexos se muestran de manera ilustrativa el uso y contenido es responsabilidad de la Dirección de Tecnologías de la Información y Telecomunicaciones.</p>
            `;
            break;

        case 7:
            contentText.innerHTML = `
            <h2>Control del documento</h2>
            <div id="tbl-gral">
                <table>
                    <tr>
                        <th>LAYOUT</th>
                        <th>FECHA</th>
                        <th>ORDEN DE LIBERACIÓN</th>
                        <th>PROPUESTA DE SEGUIMIENTO A VERSIONES</th>
                        <th>EN CASO DE QUE HAYAN ACTUALIZACIONES</th>
                    </tr>
                    <tr>
                        <td>LAYOUT CONSULTAS1_GENERAL</td>
                        <td>15/03/2024</td>
                        <td>1</td>
                        <td>1.0 (15/03/2024)</td>
                        <td>1.1 - 1.2 - 1.3…</td>
                    </tr>
                    <tr>
                        <td>LAYOUT CONSULTAS2_SEGUROS</td>
                        <td>22/03/2024</td>
                        <td>2</td>
                        <td>2.0 (22/03/2024)</td>
                        <td>2.1 - 2.2 - 2.3…</td>
                    </tr>
                    <tr>
                        <td>LAYOUT CONSULTAS3_SIC</td>
                        <td>01/04/2024</td>
                        <td>3</td>
                        <td>3.0</td>
                        <td>3.1 - 3.2 - 3.3…</td>
                    </tr>
                </table>
                </div>
            `;
            break;
        case 8:
            contentText.innerHTML = `
            <h2>Preguntas frecuentes</h2>
            <div id="tbl-quest">
            <table>
                <tr>
                    <th>Pregunta</th>
                    <th>Respuesta</th>
                </tr>
                <tr>
                    <td>¿La API REUNE aplica para el registro y/o actualización de datos de la UNE, la Validación mensual de datos de la UNE y el Informe Trimestral de Consultas, Reclamaciones y Aclaraciones?</td>
                    <td>No, solo aplica para el Informe Trimestral de Consultas, Reclamaciones, y Aclaraciones
                    </td>
                </tr>
                <tr>
                    <td>¿A partir de qué Informe Trimestral debo utilizar la API?</td>
                    <td>A partir del Segundo Informe Trimestral de Consultas, Reclamaciones, y Aclaraciones de 2024 que se presentará en los primeros 10 días hábiles del mes de julio 2024.
                </td>
                <tr>
                    <td>Si ya tengo el acuse y el token, ¿debo generar otro token?</td>
                    <td>No, ese token te servirá para poder establecer la conexión con la API-REUNE.
                    </td>
                </tr>      
                <tr>
                    <td>¿Qué pasa con los Endpoints publicados en el año 2023? ¿Siguen vigentes?</td>
                    <td>La información publicada en ese año ya no se encuentra vigente. Por lo tanto, se sugiere mantenerse atento a las actualizaciones que se realicen en la Guía de conexión API-REUNE para contar con información actualizada.
                    </td>
                </tr>
                <tr>
                    <td>¿Se utilizará el mismo token que se usa en la API de REDECO para el consumo de la API REUNE?</td>
                    <td>No, cada registro tiene su propio token.
                    </td>
                </tr>
                <tr>
                    <td>¿Dónde puedo consultar los catálogos de Productos y/o Servicios, Causas o Motivos, Entidades Federativas, Códigos Postales, Delegaciones/Municipios, Localidades y Colonias (SEPOMEX), Medios de Recepción o Canales, Niveles de Atención, Sentido de Resolución, Ramos (exclusivamente sector Seguros) e Instituciones Financieras (exclusivamente sector SIC's)?</td>
                    <td>Únicamente estarán disponibles en el sistema REUNE para su consulta y descarga.
                    </td>
                </tr>
                <tr>
                    <td>¿Existe un Manual de Conexión para la API de REUNE disponible?</td>
                    <td>Podrá consultar la Guía de conexión API-REUNE en se la sección de Tutoriales y Descargas de Manuales de la documentación de la API-REUNE.
                    </td>
                </tr>
                <tr>
                    <td>¿Si presento mi Informe Trimestral en ceros, debo generar mi token y hacer uso de la API?</td>
                    <td>Todas las instituciones financieras están obligadas a contar con su token. No obstante, si presentas un balance en ceros, deberás ingresar al REUNE, seleccionar el menú 'Informe Trimestral' y luego la opción de 'Cierre de Informe Trimestral'. Así podrás presentar tu informe en ceros.
                    </td>
                </tr>
                <tr>
                    <td>¿Podemos realizar alguna prueba en el uso y envío de información?</td>
                    <td>El calendario programado para que las Instituciones Financieras puedan realizar pruebas será desde el 15 de marzo hasta el 14 de junio de 2024.
                    </td>
                </tr>
                <tr>
                    <td>¿Habrá alguna capacitación hacia las instituciones financieras por parte de la CONDUSEF?</td>
                    <td>El 22 de marzo se publicará el calendario de pláticas que se estarán brindando sobre el uso de la API.
                    </td>
                </tr>
            </table>
            </div>              
            `;
            break;
        case 9:
            contentText.innerHTML = `
            <h2>Contacto</h2>
            <p>Se proporciona un correo electrónico de contacto para el soporte técnico en el uso de la API: </p>
            <a href="mailto:soporte.api.reune@condusef.gob.mx"> </strong>soporte.api.reune@condusef.gob.mx</a>
            `;
            break;

        case 10:
            contentText.innerHTML = `
            <h2>Tutoriales y Guías de Conexión</h2>
            <h3>En esta sección se encuentran algunos tutoriales y guías para conectarse exitosamente a la API de REUNE</h3>
            
            <ul>
                <li>
                    <h4>Guías en formato PDF</h4>
                </li>
                <ul>
                    <li><p><a target="blank" href="/pdfgral"><p>Guía de Consulta General de la API-REUNE</a></p></li>
    
                </ul> 
                <ul>
                    <li><p><a target="blank" href="/pdfseguros"><p>Guía de Consulta de Seguros de la API-REUNE</a></p></li>

                </ul> 
                <ul>
                    <li><p><a target="blank" href="/pdfsics"><p>Guía de Consulta de Sociedades de Información Crediticia (SIC's) de la API-REUNE</a></p></li>

                </ul> 
                
            </ul> 
                
            `;
            break;
        default:
            contentText.innerHTML = "Selecciona una sección del menú para ver el contenido.";
    }
}


