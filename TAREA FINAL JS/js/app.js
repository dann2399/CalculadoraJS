var calculadora = {

	//Funcion para los eventos del boton
	EventosDeBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.EventoBotonChiquito;
			x[i].onmouseleave = this.EventoBotonGrande;
		};
	},

	EventoBotonChiquito: function(event){
		calculadora.BotonChiquito(event.target);
	},

	EventoBotonGrande: function(event){
		calculadora.BotonGrande(event.target);
	},
		
	BotonChiquito: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
			elemento.style.width = "21%";
			elemento.style.height = "62px";
		}
	},
	
	BotonGrande: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},

	// se inicializa los eventos para la clase .tecla
	init: (function(){
		this.EventosDeBotones(".tecla");
		this.AsignarTeclas();
	}),

	// cuando se de click traemos el id y se le asigna una funcionalidad
	AsignarTeclas: function(){

		// asignar numeros
		document.getElementById("0").addEventListener("click", function() {calculadora.Numero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.Numero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.Numero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.Numero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.Numero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.Numero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.Numero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.Numero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.Numero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.Numero("9");});

		// asignar operaciones
		document.getElementById("mas").addEventListener("click", function() {
			calculadora.Operacion("+");
		});
		document.getElementById("menos").addEventListener("click", function() {
			calculadora.Operacion("-");
		});
		document.getElementById("por").addEventListener("click", function() {
			calculadora.Operacion("*");
		});
		document.getElementById("dividido").addEventListener("click", function() {
			calculadora.Operacion("/");
		});


		// funcionalidades de la calculadora
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		
	},

	// se crea la variable pantalla la cual se iguala al display para cambiar los numeros
	Pantalla: document.getElementById("display"),
	NumeroPantalla: "0",
	teclaIgual:false,

	Numero: function(numero){
		// si este valor es menor que la longitud de 8 caracteres entra
		if (this.NumeroPantalla.length < 8) {
			
			// si todavia no se ha metido numeros se borra el 0 y se mete el nuevo numero
			if (this.NumeroPantalla	==	"0") {
				this.NumeroPantalla = "";
				this.NumeroPantalla = this.NumeroPantalla + numero;
			} 
			// si ya hay un numero se va anexando uno enseguida del otro
			else {
				this.NumeroPantalla = this.NumeroPantalla + numero;
			}

		// finalmente se actualiza la pantalla
		this.ActualizarPantalla();
		}
	},

	Operacion: function(signo){
		// el valor ingresado se convierte a un float
		this.valor1 = parseFloat(this.NumeroPantalla);

		// se formatea el display
		this.NumeroPantalla = "";

		// se asigna a operacion el signo ingresado
		this.operacion = signo;

		// se desactiva la funcionalidad de la tecla igual
		this.teclaIgual = false;

		// se actualiza los datos en pantalla
		this.ActualizarPantalla();
	},

	// se crea la funcion borrar pantalla la cual inicializa todo en 0 y en vacio
	borrarPantalla: function(){ 
	    this.NumeroPantalla = "0";
		this.operacion = "";
		this.valor1 = 0;
		this.valor2 = 0;
		this.resultado = 0;
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.ActualizarPantalla();
	},

	// se crea la funcion cambiar signo
	cambiarSigno: function(){

		// si el valor en pantalla es diferente a 0
		if (this.NumeroPantalla !="0") {

			// se crea una variable auxiliar 
			var aux;

			// con la funcion chartAt en la posicion 0 evaluamos si a la operacion 
			// la acompaña un negativo
			if (this.NumeroPantalla.charAt(0)=="-") {

				// el auxiliar con ayuda del slice nos va a retornar el numero despues del -
				// es decir ya estando positivo
				aux = this.NumeroPantalla.slice(1);
			}	
			// si la posicion 0 en el charAt no es un negativo si no q es un +
			else {

				// al numero que hay en el auxiliar se le antepone el signo -
				aux = "-" + this.NumeroPantalla;
			}

		// se formatea lo q hay en pantalla y se muestra el auxliar en pantalla con el cambio
		this.NumeroPantalla = "";
		this.NumeroPantalla = aux;
		this.ActualizarPantalla();
		}
	},
	
	ingresoDecimal: function(){

		// con la ayuda del ixdexOf se evalua el numero
		if (this.NumeroPantalla.indexOf(".")== -1) {

			// si esta en 0 la pantalla se le anexa 0. y el numero q se escriba
			if (this.NumeroPantalla == ""){
				this.NumeroPantalla = this.NumeroPantalla + "0.";
			} 
			// en caso contrario se le anexa el punto 
			else {
				this.NumeroPantalla = this.NumeroPantalla + ".";
			}
			this.ActualizarPantalla();
		}
	},
	

	// se crea una funcion resultado
	verResultado: function(){

		// se evalua la tecla igual
		// se evalua si hay valor digitado en el display
		if(!this.teclaIgual){ 
			// el valor dos se convierte a un float
			this.valor2 = parseFloat(this.NumeroPantalla);

			// el ultimo valor se iguala al valor dos
			this.ultimoValor = this.valor2;

			// finalmente se realiza la operacion con el valor 1 y el 2
			this.realizarOperacion(this.valor1, this.valor2, this.operacion);
		
		} 
		// si no hay operacion es decir simplmente un numero y se les estripa la tecla =
		// 
		else {
			alert("- Dale en ON para borrar la pantalla  \n - O puedes seguir operando el numero: '" + this.NumeroPantalla 
				+ "' con:\n una suma(+) \n una resta(-)\n una multiplicacion(*)\n o una divicion(/)");
		}
	
		this.valor1 = this.resultado;
		this.NumeroPantalla = "";
	
		// si el resultado es menor a 9 caracteres se imprime todo el resultado
		if (this.resultado.toString().length < 9){
			this.NumeroPantalla = this.resultado.toString();
		} 
		// si el resultado supera la cifra de 8 caracteres osea de 8 para arriba
		// se imprimen los primeros 8 numeros de la respuesta y se le anexa a lo ultimo tres puntos ...
		else {
			this.NumeroPantalla = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.teclaIgual = true;		
		this.ActualizarPantalla();
	
	},

	realizarOperacion: function(valor1, valor2, operacion){

		// se hace un switch para detectar q signo fue ingresado por el usuario
		// depende del signo entra y a la variable resultado se iguala a la operacion del valor 1 mas el valor 2
		switch(operacion){
			case "+": 
				this.resultado = eval(valor1 + valor2);
			break;

			case "-": 
				this.resultado = eval(valor1 - valor2);
			break;

			case "*": 
				this.resultado = eval(valor1 * valor2);
			break;

			case "/": 
				this.resultado = eval(valor1 / valor2);
			break;
		}
	},
	
	

	// se crea funcion para actualizar pantalla cuando se mete numeros
	ActualizarPantalla: function(){
		this.Pantalla.innerHTML = this.NumeroPantalla;
	},
	
	
};

calculadora.init();