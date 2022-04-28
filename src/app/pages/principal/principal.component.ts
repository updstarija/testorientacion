import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  QueryFn as QueryFnRealtime,
} from '@angular/fire/database';
import { map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  usuario: any;
  grupos_seleccionados: any[];
  grupos_mostrar: any;
  grupos: any;
  profesiones = [
    'Decoración',
    'Arquitectura',
    'Diseño de Interiores',
    'Diseño en Artes Plásticas',
    'Diseño Gráfico',
    'Diseño Industrial',
    'Dibujo Técnico',
    'Arte y Diseño',
    'Bellas Artes',
    'Ingeniería Civil',
    'Ingeniería de Sistemas',
    'Ingeniería Industrial',
    'Ingeniería Automotriz',
    'Ingeniería Electrónica',
    'Ingeniería Mecánica',
    'Aeronáutica',
    'Ingeniería en Gestión Petrolera',
    'Ingeniería en Redes y Telecomunicaciones',
    'Ingeniería en Gestión Ambiental',
    'Ingeniería Agroforestal',
    'Ingeniería Química',
    'Ingeniería Eléctrica',
    'Ingeniería Biomédica',
    'Ingeniería Minera',
    'Geología',
    'Construcción Civil',
    'Bombero',
    'Técnico en celulares/aplicaciones móviles',
    'Mantenimiento/ Reparación de PC´S',
    'Agronomía',
    'Ingeniería Forestal',
    'Agrimensura',
    'Topografía y Geodesia',
    'Veterinaria',
    'Técnico Agropecuario',
    'Ingeniería de Alimentos',
    'Nutrición y Dietética',
    'Gastronomía',
    'Preparador Físico',
    'Entrenador',
    'Profesor de Educación Física',
    'Profesor de Artes Marciales/Yoga',
    'Deportista Profesional',
    'Derecho',
    'Licenciatura en Idiomas/Lenguas',
    'Psicología',
    'Sociología',
    'Pedagogía',
    'Psicopedagogía',
    'Magisterio',
    'Historia',
    'Filosofía',
    'Antropología',
    'Trabajo Social',
    'Profesor/Parvulario',
    'Turismo/Hotelería',
    'Lingüística',
    'Orientador',
    'Trámites Jurídicos',
    'Relaciones Internacionales',
    'Ciencias de la Comunicación Social',
    'Relaciones Públicas',
    'Periodismo',
    'Cine/Fotografía/Edición',
    'Química',
    'Astronomía',
    'Física',
    'Matemática',
    'Biología',
    'Meteorología',
    'Medicina',
    'Enfermería',
    'Fisioterapia',
    'Odontología',
    'Bioquímica y Farmacia',
    'Kinesiología',
    'Fonoaudiología',
    'Contaduría Pública',
    'Economía',
    'Administración de Empresas',
    'Ingeniería Comercial',
    'Ingeniería Financiera',
    'Comercio Exterior',
    'Secretariado Ejecutivo',
    'Gestión Pública',
    'Marketing y Publicidad',
    'Logística y Transporte',
    'Administración Aduanera',
    'Auxiliar Contable',
    'Perito en Banca',
    'Asistente administrativo',
    'Composición Musical',
    'Director de Orquesta',
    'Profesor de Música',
    'Ballet',
    'Teatro',
    'Canto',
    'Técnico de Imagen y Sonido',
    'Ingeniería de Sonido',
    'Policía',
    'Militar',
    'Estética',
    'Estilismo',
    'Organización de Eventos',
    'Asesoría de Imagen',
    'Diseño de Moda',
    'Sastrería y Costura',
    'Carpintería',
    'Metalurgia',
    //agregados anexo 2 enviado por licen cecilia
    'Administración Bancaria y Financiera',
    'Agente Inmobiliario',
    'Asistente geriátrico',
    'Aviación',
    'Biotecnología',
    'Bombero/ Rescatista',
    'Ciencias Políticas',
    'Gestión Cultural',
    'Ingeniería Agroindustrial',
    'Ingeniería Mecatrónica',
    'Literatura',
    'Mercadotecnia',
    'Música',
    'Pintura',
    'Técnico en Computación',
    'Terapeuta Ocupacional',
    'Zoología',
    // Carreras Agregadas gestión 2022
    'Técnico Radiólogo',
    'Técnico Optometrista',
    'Técnico Dental ',
    'Traductor',
    'Imagenología',
    'Ciencias de la Educación ',
    'Informática',
    'Laboratorista',
    'Cosmetología',
    'Ciencias de la Actividad Física y del Deporte',
    'Electricidad Industrial',
    'Industria Textil y Confección',
    'Redes de Gas ',
    'Sistemas Informáticos ',
    'Mecánica Industrial',
    'Corte y Confección',
    'Creación de Apps web y móviles',
  ];
  trabajos = [
    // 'Trabajo técnico (electricidad/mecánica/automotriz/plomería/carpintería, metalurgia, etc.)',
    // 'Tengo mi propio emprendimiento comercial(negocio)',
    'Trabajo en una fábrica',
    'Cuidando personas (niñera/cuidadora)',
    // 'Manejando computadoras',
    // 'Trabajo manual (trabajadora del hogar)',
    'Dirigiendo una empresa/organización',
    // 'Vendiendo productos/Servicios',
    'Trabajo en el campo',
    'Construyendo obras/estructuras',
    // 'Manipulando alimentos',
    // 'Taxista',
    // 'Atención al cliente en un centro/tienda',
    // 'Promuevo el ejercicio físico y la competencia (Entrenador)',
    'Enseñando a personas',
    'Seguridad',
    // 'Curando personas',
    // 'Ayudando a personas',
    'Manejando maquinaria pesada',
    // 'Manejando documentos',
    // 'Manejando dinero',
    // 'Haciendo cálculos numéricos/económicos',
    //correccion prueba 1 licen cecilia
    'Asistente de oficina',
    'Atención al cliente en un centro o tienda (venta de productos/ servicios)',
    'Arreglando computadoras, celulares',
    'Elaborando alimentos',
    'Mesero/a',
    'Entrenador',
    'Chofer',
    'Tengo mi propio negocio',
    'Trabajadora del hogar',
    'Trabajo técnico (electricidad, mecánica, plomería/ metalurgia/carpintería/pintura, etc.)',
    'Trabajo técnico (sastrería, costura, estilismo, estética, etc.)',
  ];
  gustos1 = [
    'Deporte (en un club/ gimnasio)',
    'Redes sociales',
    'Lectura',
    'Salir con los amigos',
    'Pasar tiempo con la familia',
    'Ir al cine',
    'Ir a bailar',
    'Ver televisión',
    'Jugar videojuegos',
    'Aprender un idioma',
    'Cocina/ Repostería',
    'Salir al campo',
    'Asistir a la Iglesia',
    'Hacer voluntariado (scouts, iglesia, clubes, etc.)',
    'Tocar un instrumento',
    'Seguir un hobby (trabajos manuales, coro, patinar, andar en bici, etc.)',
  ];
  test1: any;
  test2: any;
  test3: any;
  test4: any;
  constructor(
    public rtDB: AngularFireDatabase,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public toastr: ToastrManager,
    private router: Router
  ) {
    this.test1 = {
      preguntas: [
        {
          texto:
            'A continuación se incluyen las preguntas que te ayudaron a imaginar un futuro (edad de 19, 20 o 21 años). ¡Respóndelas para que podamos conocerte!',
        },
        {
          texto: '1. En tu sueño, ¿qué imágenes han venido a tu mente?',
          respuesta: '',
        },
        {
          texto: '2. En tu sueño, ¿en qué lugar te encuentras?',
          respuesta1: '',
          respuesta2: '',
          otro1: '',
          otro2: '',
        },

        {
          texto: '3. En tu sueño, ¿a qué te dedicas?',
          respuesta: '',
          otro: '',
        },
        {
          texto:
            '4. En tu sueño, ¿qué carrera imaginaste estudiar? (indica una o varias si hubo indecisión) ',
          repuesta_sin_sueno: false,
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          otro1: '',
          otro2: '',
          otro3: '',
          otro4: '',
        },
        {
          texto: '5. En tu sueño, ¿qué haces como trabajo?',
          respuesta: '',
          otro: '',
        },
        {
          texto: '6. En tu sueño, ¿a qué dedicas tu tiempo libre?',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          otro1: '',
          otro2: '',
          otro3: '',
        },
      ],
      pregunta: 0,
      activo: false,
      realizado: false,
    };
    this.test2 = {
      preguntas: [
        {
          texto:
            'CONSIGNA: Puntúa los siguientes intereses de 1 a 5 dependiendo de lo conforme que estés con la afirmación o el interés que despierte en ti.',
        },
        {
          texto: 'A. HABILIDADES MANUALES O MECÁNICAS',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'B. HABILIDADES PARA EL CÁLCULO Y EL RAZONAMIENTO',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'C. APTITUD VERBAL / COMUNICACIONAL',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'D. HABILIDADES PARA LAS RELACIONES SOCIALES / LIDERAZGO  ',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'E. APTITUD ARTÍSTICA',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'F. APTITUD CREATIVA',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'G. DIMENSIÓN RELACIONAL-AMBIENTAL',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
        {
          texto: 'H. DIMENSIÓN DE CUIDADO PERSONAL Y SALUD',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
        },
      ],
      pregunta: 0,
      activo: false,
      realizado: false,
    };
    this.test3 = {
      preguntas: [
        {
          texto:
            'CONSIGNA: Revisa los siguientes 10 grupos de Aptitudes y marca el grado de capacidad que tienes en cada uno de ellos',
        },
        {
          texto: 'GRUPO 1. Habilidades manuales o mecánicas',
          respuesta: 0,
        },
        {
          texto:
            'GRUPO 2. Habilidades para el deporte y actividades al aire libre',
          respuesta: 0,
        },
        {
          texto: 'GRUPO 3. Habilidades para acabar las cosas y ser detallistas',
          respuesta: 0,
        },
        {
          texto:
            'GRUPO 4. Habilidades para el manejo de cifras, números y control del gasto',
          respuesta: 0,
        },
        {
          texto: 'GRUPO 5. Habilidades para influir, persuadir, atender',
          respuesta: 0,
        },
        {
          texto:
            'GRUPO 6. Aptitudes artísticas, manipulativas o de manejo de las cosas',
          respuesta: 0,
        },
        {
          texto: 'GRUPO 7. Aptitudes lingüística, de lectura y escritura',
          respuesta: 0,
        },
        {
          texto: 'GRUPO 8. Aptitudes para planificar, organizar, dirigir',
          respuesta: 0,
        },
        {
          texto: 'GRUPO 9. Aptitudes para enseñar, educar, ayudar',
          respuesta: 0,
        },
        {
          texto:
            'GRUPO 10. Aptitudes para el arte, la creatividad y la innovación',
          respuesta: 0,
        },
        {
          texto:
            '¡Estas son tus principales aptitudes! De esos grupos, escoge 2 o 3 principales en los que tengas los mayores puntajes (3 o 4 o en su defecto 2) ',
        },
      ],
      pregunta: 0,
      activo: false,
      realizado: false,
    };
    this.test4 = {
      preguntas: [
        {
          texto:
            'CONSIGNA: Imagínate que pasaron 5 años y terminaste estudios técnicos o universitarios. Responde las siguientes preguntas.',
        },
        {
          texto:
            '1. ¿En qué trabajo te imaginas desempeñándote? Indica uno o varios si estás indeciso/a',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
        },
        {
          texto:
            '2. Indica cómo valorarías los siguientes aspectos al momento de elegir un trabajo: -Positivo/no tendría problema con ello (SI)  -Negativo/ no me gustaría  (NO)',
          respuesta1: '',
          respuesta2: '',
          respuesta3: '',
          respuesta4: '',
          respuesta5: '',
          respuesta6: '',
          respuesta7: '',
          respuesta8: '',
          respuesta9: '',
          respuesta10: '',
          respuesta11: '',
          respuesta12: '',
          respuesta13: '',
          respuesta14: '',
        },
        {
          texto:
            '3. ¿En qué otros trabajos imaginas poder desempeñarte si tendrías la posibilidad de aprenderlos y cuáles no aceptarías para nada?',
          respuestaSi1: '',
          respuestaSi2: '',
          respuestaSi3: '',
          respuestaSi4: '',
          respuestaSi5: '',
          respuestaNo1: '',
          respuestaNo2: '',
          respuestaNo3: '',
          respuestaNo4: '',
          respuestaNo5: '',
          OtroRespuestaSi1: '',
          OtroRespuestaSi2: '',
          OtroRespuestaSi3: '',
          OtroRespuestaSi4: '',
          OtroRespuestaSi5: '',
          OtroRespuestaNo1: '',
          OtroRespuestaNo2: '',
          OtroRespuestaNo3: '',
          OtroRespuestaNo4: '',
          OtroRespuestaNo5: '',
        },
      ],
      pregunta: 0,
      activo: false,
      realizado: false,
    };
  }

  ngOnInit(): void {
    this.afAuth.user.subscribe((u: any) => {
      this.obtenerUsuario(u.uid).subscribe((o) => {
        if (o.nombres) {
          this.usuario = o;
        } else {
          this.router.navigate(['/inicio']);
        }
        if (o.tests) {
          console.log(o.tests);
          if (o.tests.test1) {
            this.test1 = o.tests.test1;
          }
          if (o.tests.test2) {
            this.test2 = o.tests.test2;
          }
          if (o.tests.test3) {
            this.test3 = o.tests.test3;
            this.grupos = [
              {
                key: 'grupo1',
                texto: this.test3.preguntas[1].texto,
                valor: parseInt(this.test3.preguntas[1].respuesta) || 0,
              },
              {
                key: 'grupo2',
                texto: this.test3.preguntas[2].texto,
                valor: parseInt(this.test3.preguntas[2].respuesta) || 0,
              },
              {
                key: 'grupo3',
                texto: this.test3.preguntas[3].texto,
                valor: parseInt(this.test3.preguntas[3].respuesta) || 0,
              },
              {
                key: 'grupo4',
                texto: this.test3.preguntas[4].texto,
                valor: parseInt(this.test3.preguntas[4].respuesta) || 0,
              },
              {
                key: 'grupo5',
                texto: this.test3.preguntas[5].texto,
                valor: parseInt(this.test3.preguntas[5].respuesta) || 0,
              },
              {
                key: 'grupo6',
                texto: this.test3.preguntas[6].texto,
                valor: parseInt(this.test3.preguntas[6].respuesta) || 0,
              },
              {
                key: 'grupo7',
                texto: this.test3.preguntas[7].texto,
                valor: parseInt(this.test3.preguntas[7].respuesta) || 0,
              },
              {
                key: 'grupo8',
                texto: this.test3.preguntas[8].texto,
                valor: parseInt(this.test3.preguntas[8].respuesta) || 0,
              },
              {
                key: 'grupo9',
                texto: this.test3.preguntas[9].texto,
                valor: parseInt(this.test3.preguntas[9].respuesta) || 0,
              },
              {
                key: 'grupo10',
                texto: this.test3.preguntas[10].texto,
                valor: parseInt(this.test3.preguntas[10].respuesta) || 0,
              },
            ];
            this.grupos = this.grupos.sort(function (a, b) {
              return b.valor - a.valor;
            });
            this.grupos_mostrar = [];
            console.log(this.grupos);
            for (var i = 0; i < 10; i++) {
              var grupo = {
                key: this.grupos[i].key,
                texto: this.grupos[i].texto,
                valor: this.grupos[i].valor,
                check: false,
              };
              this.grupos_mostrar.push(grupo);
            }
          }
          if (o.tests.test4) {
            this.test4 = o.tests.test4;
          }
        } else {
          this.test1.activo = true;
        }
      });
    });
    this.profesiones.sort();
    this.trabajos.sort();
    this.trabajos.push('Otro');
    this.gustos1.sort();
    this.gustos1.push('Otro');
    console.log('estado de test 3');
    console.log(this.test3.activo);
    console.log(this.test3);
    console.log('estado de test 4');
  }
  test1_next() {
    // console.log('pregunta => ',this.test1.pregunta)
    console.log('all pregunts ', this.test1.preguntas);
    if (this.test1.pregunta == 4) {
      console.log('estoy en la pregunta numero 6');
      console.log(
        this.test1.preguntas[4].respuesta == 'No hago nada de lo anterior'
      );
      if (
        this.test1.preguntas[3].respuesta == 'Estudio' ||
        this.test1.preguntas[3].respuesta == 'No hago nada de lo anterior' ||
        this.test1.preguntas[3].respuesta == 'Otro'
      ) {
        console.log('poner ninguno');
        this.test1.preguntas[5].respuesta = 'Ninguno';
        this.test1.pregunta = 5;
      }
    }
    if (this.test1.pregunta == 3) {
      if (this.test1.preguntas[4].repuesta_sin_sueno == 'true') {
        this.test1.preguntas[4].repuesta_sin_sueno = true;
      } else if (this.test1.preguntas[4].repuesta_sin_sueno == 'false') {
        this.test1.preguntas[4].repuesta_sin_sueno = false;
      }
    }
    if (this.test1.pregunta == 0) {
      this.test1.pregunta++;
    } else {
      if (this.test1.preguntas[1].respuesta == '' && this.test1.pregunta == 1) {
        this.toastr.infoToastr(
          'Debe responder la pregunta para continuar.',
          'Datos Incompletos!'
        );
      } else if (
        (this.test1.preguntas[2].respuesta1 == '' &&
          this.test1.pregunta == 2) ||
        (this.test1.preguntas[2].respuesta2 == '' &&
          this.test1.pregunta == 2) ||
        (this.test1.preguntas[2].respuesta1 == 'Otro Pais' &&
          this.test1.preguntas[2].otro1 == '' &&
          this.test1.pregunta == 2) ||
        (this.test1.preguntas[2].respuesta2 == 'Otro' &&
          this.test1.preguntas[2].otro2 == '' &&
          this.test1.pregunta == 2)
      ) {
        this.toastr.infoToastr(
          'Debe responder la pregunta para continuar.',
          'Datos Incompletos!'
        );
      } else if (
        (this.test1.preguntas[3].respuesta == '' && this.test1.pregunta == 3) ||
        (this.test1.preguntas[3].respuesta == 'Otro' &&
          this.test1.preguntas[3].otro == '' &&
          this.test1.pregunta == 3)
      ) {
        this.toastr.infoToastr(
          'Debe responder la pregunta para continuar.',
          'Datos Incompletos!'
        );
      } else if (
        this.test1.preguntas[4].repuesta_sin_sueno == true &&
        this.test1.preguntas[4].respuesta1 == '' &&
        this.test1.pregunta == 4
        // this.test1.preguntas[5].repuesta_sin_sueno=='false' &&  this.test1.pregunta==5

        /* || this.test1.preguntas[5].respuesta2=='' && this.test1.pregunta==5 ||
      this.test1.preguntas[5].respuesta3=='' && this.test1.pregunta==5 ||
      this.test1.preguntas[5].respuesta4=='' && this.test1.pregunta==5 */
      ) {
        this.toastr.infoToastr(
          'Debe seleccionar o escribir al menos una carrera.',
          'Datos Incompletos!'
        );
      } else if (
        (this.test1.preguntas[5].respuesta == '' && this.test1.pregunta == 5) ||
        (this.test1.preguntas[5].respuesta == 'Otro' &&
          this.test1.preguntas[5].otro == '' &&
          this.test1.pregunta == 5)
      ) {
        this.toastr.infoToastr(
          'Debe responder la pregunta para continuar.',
          'Datos Incompletos!'
        );
      } else {
        if (this.test1.pregunta == 6) {
          this.test1.private = 6;
        } else {
          this.test1.pregunta++;
        }
        this.guardarTest();
      }
    }
  }
  test1_back() {
    if (this.test1.pregunta == 6) {
      if (
        this.test1.preguntas[3].respuesta == 'Estudio' ||
        this.test1.preguntas[3].respuesta == 'No hago nada de lo anterior' ||
        this.test1.preguntas[3].respuesta == 'Otro'
      ) {
        this.test1.pregunta = 5;
      }
    }
    console.log(this.test1.pregunta);
    if (this.test1.pregunta == 0) {
      this.test1.pregunta = 0;
    } else {
      this.test1.pregunta--;
    }
  }
  test1_save() {
    if (
      (this.test1.preguntas[6].respuesta1 == '' && this.test1.pregunta == 6) ||
      /* this.test1.preguntas[7].respuesta2=='' && this.test1.pregunta==7 ||
    this.test1.preguntas[7].respuesta3=='' && this.test1.pregunta==7 || */
      (this.test1.preguntas[6].respuesta1 == 'Otro' &&
        this.test1.preguntas[6].otro1 == '' &&
        this.test1.pregunta == 6)
      /* || this.test1.preguntas[7].respuesta2=='Otro' && this.test1.preguntas[7].otro2=='' && this.test1.pregunta==7 ||
    this.test1.preguntas[7].respuesta3=='Otro' && this.test1.preguntas[7].otro3=='' && this.test1.pregunta==7 */
    ) {
      this.toastr.infoToastr(
        'Debe responder la pregunta para continuar.',
        'Datos Incompletos!'
      );
    } else {
      this.test1.activo = false;
      this.test1.realizado = true;
      this.test2.activo = true;
      this.guardarTest();
      $('#ModalTest1').modal('hide');
      $('#ModalConfirmarTest1').modal('hide');
    }
  }

  test2_next() {
    if (this.test2.pregunta == 0) {
      this.test2.pregunta++;
    } else {
      if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta1) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta2) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta3) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta4) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta5) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta6) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta7) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta8) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta9) &&
          this.test2.pregunta == 1) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[1].respuesta10) &&
          this.test2.pregunta == 1)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta1) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta2) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta3) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta4) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta5) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta6) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta7) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta8) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta9) &&
          this.test2.pregunta == 2) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[2].respuesta10) &&
          this.test2.pregunta == 2)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta1) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta2) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta3) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta4) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta5) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta6) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta7) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta8) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta9) &&
          this.test2.pregunta == 3) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[3].respuesta10) &&
          this.test2.pregunta == 3)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta1) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta2) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta3) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta4) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta5) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta6) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta7) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta8) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta9) &&
          this.test2.pregunta == 4) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[4].respuesta10) &&
          this.test2.pregunta == 4)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta1) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta2) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta3) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta4) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta5) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta6) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta7) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta8) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta9) &&
          this.test2.pregunta == 5) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[5].respuesta10) &&
          this.test2.pregunta == 5)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta1) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta2) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta3) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta4) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta5) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta6) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta7) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta8) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta9) &&
          this.test2.pregunta == 6) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[6].respuesta10) &&
          this.test2.pregunta == 6)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta1) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta2) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta3) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta4) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta5) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta6) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta7) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta8) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta9) &&
          this.test2.pregunta == 7) ||
        (![1, 2, 3, 4, 5].includes(this.test2.preguntas[7].respuesta10) &&
          this.test2.pregunta == 7)
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 5.',
          'Datos Incompletos!'
        );
      } else if (this.test2.pregunta == 8) {
        this.test2.pregunta = 8;
      } else {
        this.test2.pregunta++;
      }
      this.guardarTest();
    }
  }
  test2_back() {
    if (this.test2.pregunta == 0) {
      this.test2.pregunta = 0;
    } else {
      this.test2.pregunta--;
    }
  }
  test2_save() {
    if (
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta1) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta2) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta3) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta4) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta5) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta6) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta7) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta8) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta9) &&
        this.test2.pregunta == 8) ||
      (![1, 2, 3, 4, 5].includes(this.test2.preguntas[8].respuesta10) &&
        this.test2.pregunta == 8)
    ) {
      this.toastr.infoToastr(
        'Las respuestas debe tener un valor entre 1 a 5.',
        'Datos Incompletos!'
      );
    } else {
      this.test2.activo = false;
      this.test2.realizado = true;
      this.test3.activo = true;
      this.guardarTest();
      $('#ModalTest2').modal('hide');
      $('#ModalConfirmarTest2').modal('hide');
    }
  }

  test3_next() {
    if (this.test3.pregunta == 0) {
      this.test3.pregunta++;
    } else {
      if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[1].respuesta)) &&
        this.test3.pregunta == 1
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[2].respuesta)) &&
        this.test3.pregunta == 2
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[3].respuesta)) &&
        this.test3.pregunta == 3
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[4].respuesta)) &&
        this.test3.pregunta == 4
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[5].respuesta)) &&
        this.test3.pregunta == 5
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[6].respuesta)) &&
        this.test3.pregunta == 6
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[7].respuesta)) &&
        this.test3.pregunta == 7
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[8].respuesta)) &&
        this.test3.pregunta == 8
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[9].respuesta)) &&
        this.test3.pregunta == 9
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else if (
        ![1, 2, 3, 4].includes(parseInt(this.test3.preguntas[10].respuesta)) &&
        this.test3.pregunta == 10
      ) {
        this.toastr.infoToastr(
          'Las respuestas debe tener un valor entre 1 a 4.',
          'Datos Incompletos!'
        );
      } else {
        if (this.test3.pregunta == 11) {
          this.test3.pregunta = 11;
        } else {
          this.test3.pregunta++;
        }
        console.log(this.test3.preguntas);
        this.grupos = [
          {
            key: 'grupo1',
            texto: this.test3.preguntas[1].texto,
            valor: parseInt(this.test3.preguntas[1].respuesta) || 0,
          },
          {
            key: 'grupo2',
            texto: this.test3.preguntas[2].texto,
            valor: parseInt(this.test3.preguntas[2].respuesta) || 0,
          },
          {
            key: 'grupo3',
            texto: this.test3.preguntas[3].texto,
            valor: parseInt(this.test3.preguntas[3].respuesta) || 0,
          },
          {
            key: 'grupo4',
            texto: this.test3.preguntas[4].texto,
            valor: parseInt(this.test3.preguntas[4].respuesta) || 0,
          },
          {
            key: 'grupo5',
            texto: this.test3.preguntas[5].texto,
            valor: parseInt(this.test3.preguntas[5].respuesta) || 0,
          },
          {
            key: 'grupo6',
            texto: this.test3.preguntas[6].texto,
            valor: parseInt(this.test3.preguntas[6].respuesta) || 0,
          },
          {
            key: 'grupo7',
            texto: this.test3.preguntas[7].texto,
            valor: parseInt(this.test3.preguntas[7].respuesta) || 0,
          },
          {
            key: 'grupo8',
            texto: this.test3.preguntas[8].texto,
            valor: parseInt(this.test3.preguntas[8].respuesta) || 0,
          },
          {
            key: 'grupo9',
            texto: this.test3.preguntas[9].texto,
            valor: parseInt(this.test3.preguntas[9].respuesta) || 0,
          },
          {
            key: 'grupo10',
            texto: this.test3.preguntas[10].texto,
            valor: parseInt(this.test3.preguntas[10].respuesta) || 0,
          },
        ];
        console.log(this.grupos);
        this.grupos = this.grupos.sort(function (a, b) {
          return b.valor - a.valor;
        });
        this.grupos_mostrar = [];
        for (var i = 0; i < 10; i++) {
          var grupo = {
            key: this.grupos[i].key,
            texto: this.grupos[i].texto,
            valor: this.grupos[i].valor,
            check: false,
          };
          this.grupos_mostrar.push(grupo);
        }
        this.guardarTest();
      }
    }
  }
  test3_back() {
    if (this.test3.pregunta == 0) {
      this.test3.pregunta = 0;
    } else {
      this.test3.pregunta--;
    }
  }
  test3_save() {
    this.grupos;
    this.grupos_seleccionados = [];
    this.grupos_mostrar.forEach((g: any) => {
      if (g.check) {
        var obj = {};
        obj[g.key] = g.valor;
        this.grupos_seleccionados.push(obj);
      }
    });
    if (
      this.grupos_seleccionados.length == 2 ||
      this.grupos_seleccionados.length == 3
    ) {
      this.test3.activo = false;
      this.test4.activo = true;
      this.test3.grupos = this.grupos_seleccionados;
      this.test3.realizado = true;
      this.GuardarTest3Resumen();
      this.guardarTest();
      $('#ModalTest3').modal('hide');
      $('#ModalConfirmarTest3').modal('hide');
    } else {
      this.toastr.infoToastr(
        'Debe seleccionar 2 o 3 grupos de interes',
        'Datos Incompletos!'
      );
    }
  }

  test4_next() {
    if (this.test4.pregunta == 0) {
      this.test4.pregunta++;
    } else {
      if (
        this.test4.preguntas[1].respuesta1 == '' &&
        this.test4.pregunta == 1
        /* ||  this.test4.preguntas[1].respuesta2=='' && this.test4.pregunta==1 ||
      this.test4.preguntas[1].respuesta3=='' && this.test4.pregunta==1 ||
      this.test4.preguntas[1].respuesta4=='' && this.test4.pregunta==1  */
      ) {
        this.toastr.infoToastr(
          'Debe responder la pregunta para continuar.',
          'Datos Incompletos!'
        );
      } else if (
        (this.test4.preguntas[2].respuesta1 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta1 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta2 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta3 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta4 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta5 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta6 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta7 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta8 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta9 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta10 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta11 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta12 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta13 == '' &&
          this.test4.pregunta == 2) ||
        (this.test4.preguntas[2].respuesta14 == '' && this.test4.pregunta == 2)
      ) {
        this.toastr.infoToastr(
          'Debe responder la pregunta para continuar.',
          'Datos Incompletos!'
        );
      } else {
        if (this.test4.pregunta == 3) {
          this.test4.pregunta = 3;
        } else {
          this.test4.pregunta++;
        }
        this.guardarTest();
      }
    }
  }
  test4_back() {
    // if (this.test4.pregunta == 4) {
    //   if (
    //     this.test4.preguntas[2].respuesta ==
    //       'Me apoya en cualquier decisión que tome' ||
    //     this.test4.preguntas[2].respuesta == 'Les es indiferente (no opinan)' ||
    //     this.test4.preguntas[2].respuesta == 'Otro'
    //   ) {
    //     this.test4.pregunta = 3;
    //   }
    // }
    if (this.test4.pregunta == 0) {
      this.test4.pregunta = 0;
    } else {
      this.test4.pregunta--;
    }
  }
  test4_save() {
    if (
      (this.test4.preguntas[3].respuestaSi1 == '' &&
        this.test4.pregunta == 3) ||
      (this.test4.preguntas[3].respuestaSi2 == '' &&
        this.test4.pregunta == 3) ||
      /* this.test4.preguntas[3].respuestaSi3=='' && this.test4.pregunta==3 ||
      this.test4.preguntas[3].respuestaSi4=='' && this.test4.pregunta==3 ||
      this.test4.preguntas[3].respuestaSi5=='' && this.test4.pregunta==3 || */
      (this.test4.preguntas[3].respuestaNo1 == '' &&
        this.test4.pregunta == 3) ||
      (this.test4.preguntas[3].respuestaNo2 == '' && this.test4.pregunta == 3)
      /* this.test4.preguntas[6].respuestaNo3=='' && this.test4.pregunta==6 ||
      this.test4.preguntas[6].respuestaNo4=='' && this.test4.pregunta==6 ||
      this.test4.preguntas[6].respuestaNo5=='' && this.test4.pregunta==6  */
    ) {
      this.toastr.infoToastr(
        'Debe responder la pregunta para continuar.',
        'Datos Incompletos!'
      );
    } else {
      this.test4.activo = false;
      this.test4.realizado = true;
      this.guadarTests().then(() => {
        $('#ModalTest4').modal('hide');
        $('#ModalConfirmarTest4').modal('hide');
        this.toastr.infoToastr(
          'Todos los test se registraron exitosamente',
          'Exito!'
        );
        this.router.navigate(['/resultados']);
      });
    }
  }
  obtenerUsuario(key) {
    return this.firestore
      .doc('usuarios/' + key)
      .snapshotChanges()
      .pipe(
        map((a: any) => {
          return { key: a.payload.id, ...a.payload.data() };
        })
      );
  }
  guadarTests() {
    var obj = {
      calificado: false,
      fechaevaluacion: Date.now(),
      tests: {
        test1: this.test1,
        test2: this.test2,
        test3: this.test3,
        test4: this.test4,
      },
      resumen: {
        test1: {
          pregunta1: { respuesta: this.test1.preguntas[1].respuesta },
          pregunta4: {
            repuesta_sin_sueno: this.test1.preguntas[4].repuesta_sin_sueno,
            respuesta1: this.test1.preguntas[4].respuesta1,
            respuesta2: this.test1.preguntas[4].respuesta2,
            respuesta3: this.test1.preguntas[4].respuesta3,
            respuesta4: this.test1.preguntas[4].respuesta4,
          },
        },
        test2: {
          testAB: {
            valor:
              parseInt(this.test2.preguntas[1].respuesta1) +
              parseInt(this.test2.preguntas[1].respuesta2) +
              parseInt(this.test2.preguntas[1].respuesta3) +
              parseInt(this.test2.preguntas[1].respuesta4) +
              parseInt(this.test2.preguntas[1].respuesta5) +
              parseInt(this.test2.preguntas[1].respuesta6) +
              parseInt(this.test2.preguntas[1].respuesta7) +
              parseInt(this.test2.preguntas[1].respuesta8) +
              parseInt(this.test2.preguntas[1].respuesta9) +
              parseInt(this.test2.preguntas[1].respuesta10) +
              (parseInt(this.test2.preguntas[2].respuesta1) +
                parseInt(this.test2.preguntas[2].respuesta2) +
                parseInt(this.test2.preguntas[2].respuesta3) +
                parseInt(this.test2.preguntas[2].respuesta4) +
                parseInt(this.test2.preguntas[2].respuesta5) +
                parseInt(this.test2.preguntas[2].respuesta6) +
                parseInt(this.test2.preguntas[2].respuesta7) +
                parseInt(this.test2.preguntas[2].respuesta8) +
                parseInt(this.test2.preguntas[2].respuesta9) +
                parseInt(this.test2.preguntas[2].respuesta10)),
          },
          testCD: {
            valor:
              parseInt(this.test2.preguntas[3].respuesta1) +
              parseInt(this.test2.preguntas[3].respuesta2) +
              parseInt(this.test2.preguntas[3].respuesta3) +
              parseInt(this.test2.preguntas[3].respuesta4) +
              parseInt(this.test2.preguntas[3].respuesta5) +
              parseInt(this.test2.preguntas[3].respuesta6) +
              parseInt(this.test2.preguntas[3].respuesta7) +
              parseInt(this.test2.preguntas[3].respuesta8) +
              parseInt(this.test2.preguntas[3].respuesta9) +
              parseInt(this.test2.preguntas[3].respuesta10) +
              (parseInt(this.test2.preguntas[4].respuesta1) +
                parseInt(this.test2.preguntas[4].respuesta2) +
                parseInt(this.test2.preguntas[4].respuesta3) +
                parseInt(this.test2.preguntas[4].respuesta4) +
                parseInt(this.test2.preguntas[4].respuesta5) +
                parseInt(this.test2.preguntas[4].respuesta6) +
                parseInt(this.test2.preguntas[4].respuesta7) +
                parseInt(this.test2.preguntas[4].respuesta8) +
                parseInt(this.test2.preguntas[4].respuesta9) +
                parseInt(this.test2.preguntas[4].respuesta10)),
          },
          testEF: {
            valor:
              parseInt(this.test2.preguntas[5].respuesta1) +
              parseInt(this.test2.preguntas[5].respuesta2) +
              parseInt(this.test2.preguntas[5].respuesta3) +
              parseInt(this.test2.preguntas[5].respuesta4) +
              parseInt(this.test2.preguntas[5].respuesta5) +
              parseInt(this.test2.preguntas[5].respuesta6) +
              parseInt(this.test2.preguntas[5].respuesta7) +
              parseInt(this.test2.preguntas[5].respuesta8) +
              parseInt(this.test2.preguntas[5].respuesta9) +
              parseInt(this.test2.preguntas[5].respuesta10) +
              (parseInt(this.test2.preguntas[6].respuesta1) +
                parseInt(this.test2.preguntas[6].respuesta2) +
                parseInt(this.test2.preguntas[6].respuesta3) +
                parseInt(this.test2.preguntas[6].respuesta4) +
                parseInt(this.test2.preguntas[6].respuesta5) +
                parseInt(this.test2.preguntas[6].respuesta6) +
                parseInt(this.test2.preguntas[6].respuesta7) +
                parseInt(this.test2.preguntas[6].respuesta8) +
                parseInt(this.test2.preguntas[6].respuesta9) +
                parseInt(this.test2.preguntas[6].respuesta10)),
          },
          testGH: {
            valor:
              parseInt(this.test2.preguntas[7].respuesta1) +
              parseInt(this.test2.preguntas[7].respuesta2) +
              parseInt(this.test2.preguntas[7].respuesta3) +
              parseInt(this.test2.preguntas[7].respuesta4) +
              parseInt(this.test2.preguntas[7].respuesta5) +
              parseInt(this.test2.preguntas[7].respuesta6) +
              parseInt(this.test2.preguntas[7].respuesta7) +
              parseInt(this.test2.preguntas[7].respuesta8) +
              parseInt(this.test2.preguntas[7].respuesta9) +
              parseInt(this.test2.preguntas[7].respuesta10) +
              (parseInt(this.test2.preguntas[8].respuesta1) +
                parseInt(this.test2.preguntas[8].respuesta2) +
                parseInt(this.test2.preguntas[8].respuesta3) +
                parseInt(this.test2.preguntas[8].respuesta4) +
                parseInt(this.test2.preguntas[8].respuesta5) +
                parseInt(this.test2.preguntas[8].respuesta6) +
                parseInt(this.test2.preguntas[8].respuesta7) +
                parseInt(this.test2.preguntas[8].respuesta8) +
                parseInt(this.test2.preguntas[8].respuesta9) +
                parseInt(this.test2.preguntas[8].respuesta10)),
          },
        },
        test3: {
          grupos: this.test3.grupos,
          grupos_todo: this.grupos_mostrar,
          grupos_total_test3: this.test3.grupos_total_test3,
        },
        test4: {
          pregunta1: {
            respuesta1: this.test4.preguntas[1].respuesta1,
            respuesta2: this.test4.preguntas[1].respuesta2,
            respuesta3: this.test4.preguntas[1].respuesta3,
            respuesta4: this.test4.preguntas[1].respuesta4,
          },
          pregunta6: {
            respuestaSi1: this.test4.preguntas[3].respuestaSi1,
            respuestaSi2: this.test4.preguntas[3].respuestaSi2,
            respuestaSi3: this.test4.preguntas[3].respuestaSi3,
            respuestaSi4: this.test4.preguntas[3].respuestaSi4,
            respuestaSi5: this.test4.preguntas[3].respuestaSi5,
            respuestaNo1: this.test4.preguntas[3].respuestaNo1,
            respuestaNo2: this.test4.preguntas[3].respuestaNo2,
            respuestaNo3: this.test4.preguntas[3].respuestaNo3,
            respuestaNo4: this.test4.preguntas[3].respuestaNo4,
            respuestaNo5: this.test4.preguntas[3].respuestaNo5,
          },
        },
      },
    };
    return this.firestore.doc('usuarios/' + this.usuario.key).update(obj);
  }
  salir() {
    this.afAuth.signOut().then(() => {
      $('#ModalSalir').modal('hide');
      this.router.navigate(['/inicio']);
    });
  }
  guardarTest() {
    if (this.test1.preguntas[3].repuesta_sin_sueno == false) {
      this.test1.preguntas[3].respuesta1 = '';
      this.test1.preguntas[3].respuesta2 = '';
      this.test1.preguntas[3].respuesta3 = '';
      this.test1.preguntas[3].respuesta4 = '';
      this.test1.preguntas[3].otro1 = '';
      this.test1.preguntas[3].otro2 = '';
      this.test1.preguntas[3].otro3 = '';
      this.test1.preguntas[3].otro4 = '';
    }
    var tests = {
      tests: {
        test1: this.test1,
        test2: this.test2,
        test3: this.test3,
        test4: this.test4,
      },
    };
    this.firestore.doc('usuarios/' + this.usuario.key).update(tests);
  }
  grupos_total_test3: any = {};
  GuardarTest3Resumen() {
    this.grupos_mostrar.forEach((g: any) => {
      if (g.key == 'grupo1') {
        this.grupos_total_test3.grupo1 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo2') {
        this.grupos_total_test3.grupo2 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo3') {
        this.grupos_total_test3.grupo3 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo4') {
        this.grupos_total_test3.grupo4 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo5') {
        this.grupos_total_test3.grupo5 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo6') {
        this.grupos_total_test3.grupo6 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo7') {
        this.grupos_total_test3.grupo7 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo8') {
        this.grupos_total_test3.grupo8 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo9') {
        this.grupos_total_test3.grupo9 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
      if (g.key == 'grupo10') {
        this.grupos_total_test3.grupo10 = {
          selectPorUser: g.check,
          selectPorConsultor: false,
          validadoPorConsultor: false,
          valor: g.valor,
        };
      }
    });
    this.test3.grupos_total_test3 = this.grupos_total_test3;
  }
}
