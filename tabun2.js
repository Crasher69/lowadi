
console.log("-- START --");
// Опция для настройки количества дней при записи в КСК.
var KCK_option = 3;
var Affixe;
var SPEED = 100; // Скорость прогона. Время прибавки к базовым задержкам, мс
var groomError = 0;
var eatError = 0;
var tolst = 0;
settings();

function murmurhash(key, seed) {
	var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

	remainder = key.length & 3; // key.length % 4
	bytes = key.length - remainder;
	h1 = seed;
	c1 = 0xcc9e2d51;
	c2 = 0x1b873593;
	i = 0;

	while (i < bytes) {
		k1 =
		((key.charCodeAt(i) & 0xff)) |
		((key.charCodeAt(++i) & 0xff) << 8) |
		((key.charCodeAt(++i) & 0xff) << 16) |
		((key.charCodeAt(++i) & 0xff) << 24);
		++i;

		k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	}

	k1 = 0;

	switch (remainder) {
	case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
	case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
	case 1: k1 ^= (key.charCodeAt(i) & 0xff);

		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= k1;
	}

	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 13;
	h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}

function is_lic()
{
	/* Logins */
	var l = ["1286811312", "556185020", "1821796050", "3681681832", "3707997714", "1771139262", "976316833", "733884697", "2066274072", "2636489867", "3366366428", "3126639141", "44229729", "661228372", "1734334125", "2865156421", "7847757", "3632479865", "1015406986"];
	var myhash = murmurhash(document.getElementsByClassName('forumAvatar')[0].alt, 5);
	var lic = false;

	for (var h=0; h<l.length; h++)
	{
		if (l[h] == myhash) lic = true;
	}
	return lic;

}


// --------------------------- Настройки скрипта --------------------------------->
function set_kck_option()
{
	var val = $("#kck_option option:selected").val();
	localStorage.setItem("lwb_kck", val);
}

function set_sluchki_option()
{
	var sl_check;
	var val = $("#sluchka_option option:selected").val();
	if ($("#slchkbx").prop("checked"))
	sl_check = "1";
	else sl_check = "0";
	localStorage.setItem("lwb_slu", val);
	localStorage.setItem("lwb_chk", sl_check);
}

function get_kck_option()
{
	value = localStorage.getItem("lwb_kck");
	$("#kck_option [value='"+value+"']").attr("selected", "selected");

	return value;
}


function get_sluchki_option()
{
	var sl_check;
	value = localStorage.getItem("lwb_slu");
	sl_check = localStorage.getItem("lwb_chk");
	$("#sluchka_option [value='"+value+"']").attr("selected", "selected");
	if(sl_check=="1")
	{
		$('#slchkbx').prop('checked', true);
		$('.lwb_sl_hide').show();
	}
	else  $('.lwb_sl_hide').hide();

	return value;
}


function savesettings()
{
	var settings_fourrage, settings_zerno, settings_shablon, affixe;
	var shablon = $("#lw_template").val();
	var Affixe = $("#affixe").val();
	var speed = $('input[name=lw_speed]:radio:checked').val();
	if ($("#settings_fourrage").prop("checked"))
	settings_fourrage = "1";
	else settings_fourrage = "0";

	if ($("#settings_zerno").prop("checked"))
	settings_zerno = "1";
	else settings_zerno = "0";
	localStorage.setItem("settings_fourrage", settings_fourrage);
	localStorage.setItem("settings_zerno", settings_zerno);
	localStorage.setItem("settings_speed", speed);
	localStorage.setItem("settings_shablon", shablon);
	localStorage.setItem("kraken_affixe", Affixe);
	alert('Сохранено');
}

function loadsettings()
{
	var settings_shablon;
	settings_shablon = localStorage.getItem("settings_shablon");
	if (settings_shablon == "" || settings_shablon === null) settings_shablon = "%GENDER%";
	settings_fourrage = localStorage.getItem("settings_fourrage");
	settings_zerno = localStorage.getItem("settings_zerno");
	settings_speed = localStorage.getItem("settings_speed");

	if (settings_fourrage=="1") $('#settings_fourrage').prop('checked', true);
	if (settings_zerno=="1") $('#settings_zerno').prop('checked', true);

	if (settings_speed) $("#"+settings_speed+"").attr("checked", true);
	else $("#norm").attr("checked", true);
	$("#lw_template").val(settings_shablon);

	Affixe = localStorage.getItem("kraken_affixe");
	if (Affixe === null) {localStorage.setItem("kraken_affixe", ''); }
	$('#affixe').val(Affixe);
	console.log(Affixe);
}

$('#kck_option').on('change', function() {
	set_kck_option();
});

$('#sluchka_option').on('change', function() {
	set_sluchki_option();
});

$('#slchkbx').on('change', function() {
	set_sluchki_option();
	if ($("#slchkbx").prop("checked"))  $('.lwb_sl_hide').show('slow');
	else  $('.lwb_sl_hide').hide('slow');
});

if (!localStorage.getItem('lwb_kck')) set_kck_option();
KCK_option = get_kck_option();
SL_option = get_sluchki_option();

settings_speed = localStorage.getItem("settings_speed");
if (settings_speed == "norm") SPEED = 700;



console.log("PAUSE = "+SPEED);
if (localStorage.getItem("settings_shablon"))
var settings_shablon = localStorage.getItem("settings_shablon");
if (settings_shablon == "") settings_shablon = "%GENDER%";

loadsettings();

var horseage = 358;
var myid = murmurhash(document.getElementsByClassName('forumAvatar')[0].alt, 5);
if (myid=="3707997714" || myid=="606006511" || myid=="828860414" || myid=="3366366428" || myid=="733884697" || myid=="3681681832") horseage = 35800;
// ---------------------- Конец настроек ------------------------------->

// Парсинг URI
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Если сайт лагает, и кидает на всех лошадей, то ищем записанную в КСК, но не уложенную спать
function bug_finder()
{
	var  horse = localStorage.getItem("horse_status");
	if (horse=='1')
	{
		horse_href = localStorage.getItem("horse_id");
		location.href="http://www.lowadi.com/elevage/chevaux/cheval?id="+horse_href;
		/*	$('.item-relative').each(function(i,elem) {
				var text = $(this).find("[data-tooltip='Размещена в комплексе']").html();
				if (text!=undefined)
					{
						kon = ($(this).find('.horsename').attr('href'));
						location.href=kon;
					}

			});*/

	}
}

setTimeout(bug_finder, 500);


if (/\/elevage\/chevaux\/cheval\?id=/.test(window.location.href))
{

	// Если конь свежекуплен, останавливаем скрипт
	if (/www.lowadi.com\/elevage\/chevaux\/cheval\?id=[0-9]+\&message=acheter/.test(window.location.href))
	{
		throw 'stop';
	}

	// Если конь не уложен спать
	if (document.getElementById('countDownWakeUp') === null)
	{
		// Если конь старше 30ти
		if (chevalAge > horseage)
		{
			// Следующий конь
			var pause = getRandomPause(500, 1000);
			setTimeout(prev1, pause);
		}
		else
		{
			if (is_lic()===true) usualProg();
		}
	}
	else
	{
		// Вдруг просто произошел глюк, и страница обновилась
		if (localStorage.getItem("horse_id")==chevalId)
		usualProg();
	}

}



// Выжеребка
if (/www.lowadi.com\/elevage\/chevaux\/choisirNoms\?jument=/.test(window.location.href))
{
	var horseid = getParameterByName('jument');
	localStorage.setItem("horse_status", "2");
	localStorage.setItem("horse_id", horseid);

	if (document.body.innerHTML.indexOf('женск.') !== - 1)
	{
		document.getElementById('poulain-1').setAttribute('value', 'Кобыла');
	}
	else document.getElementById('poulain-1').setAttribute('value', 'Жеребец');


	setTimeout(function() { $('#boutonChoisirNom').click(); }, 700 );
}


// Запись в КСК
function checkKSK()
{
	if ($('.odd.highlight').length>5)
	{
		console.log('ksk loaded');
		setTimeout(eqCenterReg2, 300+SPEED);
	}
	else setTimeout(checkKSK, 100);

}

if (/www.lowadi.com\/elevage\/chevaux\/centreInscription\?id=/.test(window.location.href))
{
	setTimeout(function() {location.reload(); },15000);
	setTimeout(checkKSK, 300+SPEED);
}



// Программа обычного прогона
function usualProg()
{
	// Статус 2 означает, что кобыла родила, переименовываем жеребенка
	var  horse = localStorage.getItem("horse_status");
	if (horse=='2')
	{
		setTimeout(horsename(settings_shablon),200+SPEED);
	}
	else
	// Статус 3 означает, что жеребенок переименован, идем обратно к родившей кобыле
	if (horse=='3')
	{
		setTimeout(j_run, 500+SPEED);
	}
	else
	{
		localStorage.setItem("horse_status", "0");
		localStorage.setItem("horse_id", chevalId);
		var pause = 0;
		
		if (document.body.innerHTML.indexOf('/elevage/chevaux/mettreBas?jument=') != - 1)
		{
			var d = document.getElementById('reproduction-body-content').childNodes[3].getElementsByTagName('a');
			d[0].removeAttribute('onclick');
			d[0].click();
		}
		else
		if (document.body.innerHTML.indexOf('/elevage/chevaux/choisirNoms?jument=') != - 1)
		{
			var d = document.getElementById('reproduction-body-content').childNodes[4].getElementsByTagName('a');
			d[0].removeAttribute('onclick');
			d[0].click();
		}
		else
		// Запись в КСК
		if (/elevage\/chevaux\/centreInscription\?id=/.test(document.body.innerHTML))
		{
			// Нажатие на кнопку
			pause = 500;
			setTimeout(eqCenterReg, pause);
			return;
		}
		else
		{	
		console.time('ALL_TIME');
		setTimeout(start_d1, 400);
		}
		setTimeout(function() {location.reload(); },25000);
	}
}



function j_run()
{
	console.log('j_run');
	if ($('.action.action-style-4.panser.action-disabled').length === 0)
	{
	console.log('groom random pos');

    if ($('#form-do-groom')[0]!==undefined) {
	let x = $('#form-do-groom')[0][2];
	let y = $('#form-do-groom')[0][3];
	$(x).val(randpos());
	$(y).val(randpos());
    }
		setTimeout(function() {
			console.log('GROOM SUBMIT');
			$('#form-do-groom').submit();
			new Action.Cheval(this, '/doGroom').send();
		},100);
		setTimeout(function() { if ($('.action.action-style-4.panser.action-disabled').length === 0) j_run(); else j2(); }, 500+SPEED);
	}
}




function j2()
{
	console.log('j2');
	setTimeout(doEatNorm, 100);
	setTimeout(function(){ if ($('.action.action-style-4.allaiter.action-disabled').length===0) j2(); else j3(); }, 300);
}


function j3()
{
	console.log('j3');
	if ($('#boutonCoucher.action-disabled').length === 0)
	{

     if ($('#form-do-night')[0]!==undefined) {
	console.log('SLEEP FORM');
	let x = $('#form-do-night')[0][2];
	let y = $('#form-do-night')[0][3];
	$(x).val(randpos());
	$(y).val(randpos());
     }

		setTimeout(function() {
			$('#form-do-night').submit();
			//new Action.Cheval(this, '/doNight').send();
		},100);
		setTimeout(function() {if ($('#boutonCoucher.action-disabled').length === 0) j3(); else j4(); }, 500+SPEED);
	}
	else setTimeout(j4, 100+SPEED);
}

function j4()
{
	localStorage.setItem("horse_status", "0");
	horse_href = localStorage.getItem("horse_id");
	setTimeout(function() { location.href="http://www.lowadi.com/elevage/chevaux/cheval?id="+horse_href; }, 300);
}



function start_d1()
{

	//Случка
	if ($("#reproduction-wrapper:contains('Покрыть')").text()!=="" && ($("#slchkbx").prop("checked")) && $('.saillir').hasClass('action-disabled')===false && chevalEnergie>64)
	{
		if (chevalEnergie>88)
		{
			setTimeout(sluchka, 100);
			setTimeout(sluchka, 200+SPEED);
		}
		else setTimeout(sluchka, 100);

		setTimeout(d_secret, 400+SPEED);
	}
	else
	d_secret();
}

function d_secret()
{
    var pause = 0;
    if ($('.action.action-style-4.panser.action-disabled').length === 0)
    {
        setTimeout(groom2,pause);
    }
    else
    if ($('.action.action-style-4.caresser.action-disabled').length === 0)
    {
        pause = pause+100;
        setTimeout(stroke2,pause);
    }
	else
    if ($('.action.action-style-4.boire.action-disabled').length ===0)
    {
        pause = pause+100;
        setTimeout(drink2,pause);
    }

	setTimeout(d3, pause+100);
}


// Урок
function d3()
{
	if (chevalAge > 18){
		lesson();
		setTimeout(d4, 300+SPEED);
	}
	else d4();
}


function d4()
{
	console.log('d4');
	if ($('.action.action-style-4.panser.action-disabled').length === 0)
	{
		console.log('Second groom');
		setTimeout(groom2,100);
	}
	if ($('.action.action-style-4.caresser.action-disabled').length === 0){
		console.log('Second stroke');
		setTimeout(stroke2,150);
	}
	setTimeout(d5(),200);
}

// Корм
function d5()
{

	console.log('d5');
	if (chevalAge > 5) {
	let x = $('#feeding')[0][2];
	let y = $('#feeding')[0][3];
	$(x).val(randpos());
	$(y).val(randpos());
	}

	console.log("Eat Norm");
	setTimeout(doEatNorm, getRandomPause(100, 200));
	setTimeout(d7, 400+SPEED);

}




function d7()
{
	console.log('d7');
	if ((chevalEnergie>16 && chevalSante>80) || myid=="3681681832")
	setTimeout(d8, 100);
	else
	{
		setTimeout(function() { if (chevalEnergie<18 || chevalSante<80)
			$('#form-do-eat-treat-mash').submit();
			new Action.Cheval(this, '/doEatTreat').send();
		}, 100);
		setTimeout(d8, getRandomPause(200, 300)+SPEED);
	}
}


function d8()
{
	console.log('Groom Error = '+groomError);
	if (groomError>6) d9();
	else {
		if ($('#boutonPanser').hasClass('action-disabled')===false)
		{
            if ($('#form-do-groom')[0]!==undefined) {
			let x = $('#form-do-groom')[0][2];
			let y = $('#form-do-groom')[0][3];
			$(x).val(randpos());
			$(y).val(randpos());
            }
			$('#form-do-groom').submit();
			new Action.Cheval(this, '/doGroom').send();
			setTimeout(function(){
				if ($('#boutonPanser').hasClass('action-disabled')===false) {groomError++; d8(); }
				else d9();
			},300+SPEED);
		}
		else d9();
	}
}

function d9()
{
	console.log("Eat Error = "+eatError);
	console.log("TOLSTIY = "+tolst);
	if (eatError>4 || tolst === 1) d10();
	else {
		if (chevalAge > 5) {

			let x = $('#feeding')[0][2];
			let y = $('#feeding')[0][3];
			$(x).val(randpos());
			$(y).val(randpos());

			console.log("Hays = "+hayToGive()+"Oats = "+oatsToGive());
			if ((hayToGive()!==0 || oatsToGive()!==0 && tolst===0))
			{
				setTimeout(doEatNorm, 100+SPEED);
				setTimeout(function() {if ((hayToGive()!==0 || oatsToGive()!==0 && tolst===0) && chevalAge > 5) {eatError++; d9();} else d10();}, 300+SPEED*2);
			}
			else d10();
		}
		else
		{
			if ($('.action.action-style-4.allaiter.action-disabled').length===0)  {
				setTimeout(doEatNorm, 100+SPEED);
				setTimeout(function() { if ($('.action.action-style-4.allaiter.action-disabled').length===0) {eatError++; d9(); }else d10(); }, 300+SPEED*2);
			}
			else d10();
		}
	}
}

// Спать
function d10()
{
	console.log('D10 - SLEEP');
	if ($('#boutonCoucher.action-disabled').length === 0)
	{
    if ($('#form-do-night')[0]!==undefined) {
        let x = $('#form-do-night')[0][2];
        let y = $('#form-do-night')[0][3];
        $(x).val(randpos());
        $(y).val(randpos());
    }
		setTimeout(function() {
			$('#form-do-night').submit();
			//new Action.Cheval(this, '/doNight').send();
		},100);
		setTimeout(function() {if ($('#boutonCoucher.action-disabled').length === 0) { d10(); } else d11(); }, getRandomPause(200, 300)+SPEED);
	}
	else d11();
}


function d11()
{
	console.timeEnd('ALL_TIME');
	setTimeout(prev, 100);
}



// Запись в КСК
function eqCenterReg()
{
	if (document.body.innerHTML.indexOf('cheval-inscription') !== - 1)
	{
		// Нажимаем на кнопку
		var d = document.getElementById('cheval-inscription').firstChild;
		if (d !== null)
		{
			d.click();
		}
	}
}
function eqCenterReg2()
{
	localStorage.setItem("horse_status", "1");
	// Смотрим настройки, и если надо, то подбираем КСК по заданным параметрам
	settings_fourrage = localStorage.getItem("settings_fourrage");
	settings_zerno = localStorage.getItem("settings_zerno");
	if (settings_fourrage == "1") setTimeout(document.getElementById('fourrageCheckbox').click(),200);
	if (settings_zerno == "1") setTimeout(document.getElementById('avoineCheckbox').click(),400);

	// Сортировка
	var c = document.getElementsByClassName('grid-cell spacer-small-top spacer-small-bottom');
	var d = c[KCK_option].getElementsByTagName('a');
	d[0].click();

	setTimeout(checkReg, 200+SPEED);
}

function checkReg()
{
	console.log('Check Reg in KCK');
	if (document.body.innerHTML.indexOf('ascendant.gif')>0)
	setTimeout(eqCenterReg3, 200+SPEED);
	else setTimeout(checkReg, 200+SPEED);

}

function eqCenterReg3()
{
	// Запись в первый
	var c = document.getElementsByClassName('odd highlight');
	var d = c[0].getElementsByTagName('button');
	var e = d[KCK_option];
	/* if (KCK_option > 1)
{
	var f = e.onclick.toString();
	var onClick = f.substr(f.indexOf('AjaxJSON'));
	onClick = onClick.substr(0, onClick.indexOf('}')) + '}))';
	e.setAttribute('onclick', onClick);
}*/
	e.click();
	setTimeout(eqCenterReg4, 1500+SPEED);
}
function eqCenterReg4()
{
	// Проверка результата
	// Если не записано, записать
	if (/message=centreOk/.test(window.location.href) !== true)
	{
		location.reload();
	}



}

// Пустая функция

function pauseFunc()
{
	if (document.body.innerHTML.indexOf('chevalId') !== - 1)
	{
		return;
	}
}

function doEatNorm()
{
	// Если кормим молоком
	if (document.body.innerHTML.indexOf('boutonAllaiter') !== -1)
	{
		var d = document.getElementById('boutonAllaiter');
		d.click();
		return;

	}
	var subm = false;
	var d2 = document.getElementById('feeding').innerHTML;

	var hay = hayToGive();
	var oats = oatsToGive();
	//alert('hay' + hay);
	//alert('oats' + oats);
	if (hay + oats === 0) return;
	if (d2.indexOf('толст') !== -1) { tolst = 1; return; }
	if (d2.indexOf('недостаточный') !== -1)
	{
		hay = 20-hayGiven();
		oats = 15-oatsGiven();
	}

	$('#haySlider-sliderHidden').val(hay);
	$('#oatsSlider-sliderHidden').val(oats);


	$('#feeding').submit();
	new Action.Cheval(this, '/doEat').send();
}
// Вычисление необходимой нормы сена
function hayToGive()/////////
{
	// Дано сена
	var hay_to_give = (hayNorm()*1-hayGiven()*1);
	// Не меньше нуля
	if (hay_to_give<0) hay_to_give = 0;
	// Не больше 10 кг
	if (hay_to_give>20) hay_to_give = 20;
	// Норма сена
	return hay_to_give;
}
// Вычисление необходимой нормы зерна
function oatsToGive(){
	if (document.getElementById('feeding').outerHTML.indexOf('oats') !== -1||document.getElementById('feeding').outerHTML.indexOf('Oats') !== -1)
	{
		var oats_to_give = (oatsNorm()*1-oatsGiven()*1);
		// Не меньше нуля
		if (oats_to_give<0) oats_to_give = 0;
		// Не больше 15 кг
		if (oats_to_give>15) oats_to_give = 15;
		// Норма сена
		return oats_to_give;
	}
	else return 0;
}

// Нормы корма
// Норма сена
function hayNorm()
{
	var hay_norm=document.getElementsByClassName('section-fourrage section-fourrage-target')[0].childNodes[0].nodeValue;
	return hay_norm;
}
// Съедено сена
function hayGiven()
{
	var d2 = document.getElementsByClassName('float-right section-fourrage section-fourrage-quantity')[0].outerHTML;
	var hay_given=d2.substring(d2.indexOf('/ <strong class')-3,d2.lastIndexOf('/ <strong class'));
	return hay_given;
}
// Норма зерна
function oatsNorm()
{
	var hay_norm=document.getElementsByClassName('section-avoine section-avoine-target')[0].childNodes[0].nodeValue;
	return hay_norm;
}
// Съедено зерна
function oatsGiven()
{
	var d2 = document.getElementsByClassName('float-right section-avoine section-avoine-quantity')[0].outerHTML;
	var oats_given=d2.substring(d2.indexOf('/ <strong class')-3,d2.lastIndexOf('/ <strong class'));
	return oats_given;
}


// Удаление пробелов
function trim(str, chars)
{
	return ltrim(rtrim(str, chars), chars);
}
function ltrim(str, chars)
{
	chars = chars || '\\s';
	return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
}
function rtrim(str, chars)
{
	chars = chars || '\\s';
	return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
}

// Случайное число
function getRandomPause(min, max)
{
	var rand = Math.random() * (max - min) + min;
	return rand;
}

// Урок
function lesson()
{
	var d;
	d = document.getElementById('boutonMissionEquus');
	if (d !== null)
	{
		//d.click();
		$("#boutonMissionEquus").submit();
		new Action.Cheval(null, '/doCentreMission', {params:'id='+chevalId}).send();
	}
	d = document.getElementById('boutonMissionMontagne');
	if (d !== null)
	{
		//d.click();
		$("#boutonMissionMontagne").submit();
		new Action.Cheval(null, '/doCentreMission', {params:'id='+chevalId}).send();
	}
	d = document.getElementById('boutonMissionForet');
	if (d !== null)
	{
		// d.click();
		$("#boutonMissionForet").submit();
		new Action.Cheval(null, '/doCentreMission', {params:'id='+chevalId}).send();
	}
	d = document.getElementById('boutonMissionPlage');
	if (d !== null)
	{
		//  d.click();
		$("#boutonMissionPlage").submit();
		new Action.Cheval(null, '/doCentreMission', {params:'id='+chevalId}).send();
	}
}

// Корм
// Чистка
function groom()
{
	$(function()
	{
		$("#form-do-groom").submit();
		return false; });
}


// Сон
function sleep()
{
	$(function()
	{
		$("#form-do-night").submit();
		return false; });
}

// Ласка
function stroke()
{
	// Если энергии <50
	var en = document.getElementById('energie').textContent;
	if (en < 50)
	{
		var d = document.getElementById('boutonCaresser');
		if (d !== null)
		{
			$(function()
			{
				$("#form-do-stroke").submit();
				return false; });
		}
	}
}

// Предыдущий
function prev()
{
	if ($('#boutonCoucher.action-disabled').length === 0)
	{
		setTimeout(sleep, 200);
	}

	var d = document.getElementById('nav-previous');
	if (d !== null && d.hasAttribute('href'))
	{
		var prevlink = $("#nav-previous").attr('href');
		setTimeout(function() {location.href="https://www.lowadi.com"+prevlink;}, 500);

	}
}



// Предыдущий
function prev1()
{

	var d = document.getElementById('nav-previous');
	if (d !== null && d.hasAttribute('href'))
	{
		var prevlink = $("#nav-previous").attr('href');
		setTimeout(function() {location.href="https://www.lowadi.com"+prevlink;}, 300);

	}
}


function mash()
{
	if ($('.action.action-style-4.mash.action-disabled').length===0)
	$('#form-do-eat-treat-mash').submit();
}

// Рост ОР
function OR()
{
	var d = document.getElementById('age');
	if (d !== null && d.hasAttribute('onsubmit'))
	{
		d.onsubmit();
	}
}


function settings()
{
	$('body#global').append('<div class="lwb_logo" style="display: block; position: fixed; width: 125px; top: 7px; left: 5px; z-index: 99990;">	<div class="fear"  style="display: block;position: fixed;width: 15px;height: 10px;top: 50px;left: 70px;"> </div>	<img src="https://raw.githubusercontent.com/Crasher69/lowadi/master/kraken2.png" width="120px"></div>');
	$('body#global').append('<div class="lwb" style="display:block; position:fixed; width:120px; height:115px; left:0; z-index:9999; top:105px; padding:5px; background-color:rgba(0, 0, 0, 0.7);  border-radius: 0px 0px 20px 0;"></div>');
	$('.lwb').append('<span class="header-currency-label" style="color:#fafe6c;  z-index:990;"><b>KrakeN 2.0.1</b></span>   <span class="lwb_setting" style="cursor:pointer; position:absolute; right:5px; top:3px; z-index:9997;">  <img src="https://raw.githubusercontent.com/Crasher69/lowadi/master/settings-n.png" width="20px" title="Показать настройки" /></span>');

	if (is_lic()===true)
	{
		$('.lwb').append('<span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;">Запись в КСК</span>	 <select id="kck_option"> <option value="0">1 день</option>	<option value="1">3 дня</option>	<option value="2">10 дней</option>	<option selected value="3">30 дней</option> </select> &nbsp  ');
		$('.lwb').append('<br> <div style="padding-top:5px;"></div> <span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;">Предлагать случки</span></td> <td><input id="slchkbx" name="slchkbx" value="1" type="checkbox">');
		$('.lwb').append('<div class="lwb_sl_hide"><span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;"> По цене</span>  <select id="sluchka_option"> <option value="500">500</option> <option value="1000">1000</option> <option value="1500">1500</option> <option value="2000">2000</option> <option value="2500">2500</option> <option value="3000">3000</option> <option value="3500">3500</option> <option value="4000">4000</option> <option value="4500">4500</option> <option value="5000">5000</option> <option value="5500">5500</option> <option value="6000">6000</option> <option value="6500">6500</option> <option value="7000">7000</option> <option value="7500">7500</option>	</select></div>');
	}
	else
	{
		var hashlogin = murmurhash(document.getElementsByClassName('forumAvatar')[0].alt, 5);
		$('.lwb').append('<center><p style="color: #fff; " >Unregistred</p></center>');
		$('.lwb').append('<center><p style="color: #fff; font-size: 11px">ID: '+hashlogin+' </p>  <p style="color: #fff; font-size: 11px">Login: '+document.getElementsByClassName('forumAvatar')[0].alt+'</p>   </center> <p style="color: #fff; font-size: 11px"> Подробнее о боте и контакты для покупки: <a style="color:#F8563B;" href="http://lowadibot.ctrl-z.ru/">lowadibot.ctrl-z.ru</a></p>');

	}
	$('body#global').append('<div class="lwb_settings" style="display: none; position: fixed; width: 600px; height:630px; top: 25px; left: 130px; z-index: 999; padding:5px; background-color:rgba(0, 0, 0, 0.95);  border-radius: 0px 5px 5px 5px;"></div>');
	$('.lwb_settings').append('<center><h2 style="color:#fff;">Настройки</h2> <br> <h3 style="color:#FFF;">Запись в КСК</h3></center> <span class="lwb_setting" style="position:absolute;  right:5px; top:2px; color:#fff; cursor:pointer;"><b>X</b></span>');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;"> <img src="http://www.lowadi.com/media/equideo/image/produits/20/fourrage_v1828806360.png" /> <input id="settings_fourrage" name="settings_fourrage" value="0" type="checkbox">  Выбирать КСК с фуражом </div>');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;"> <img src="http://www.lowadi.com/media/equideo/image/produits/20/avoine_v1828806360.png" /> <input id="settings_zerno" name="settings_zerno" value="0" type="checkbox"> Выбирать КСК с зерном </div>');
	$('.lwb_settings').append('<center> <br> <h3 style="color:#FFF;">Скорость прогона</h3></center> ');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:10px;"> <input type="radio" name="lw_speed" id="norm" value="norm"> Нормальная<Br> <input type="radio" name="lw_speed" value="fast" id="fast"> Высокая<Br>   </div> ');
	$('.lwb_settings').append('<center> <br> <h3 style="color:#FFF;">Опции родов</h3></center> ');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;">Аффикс <input type="text" id="affixe"><span style="font-size:10px"> &nbsp; Если не указать, будет навешиваться 1 из списка доступных аффиксов</span> </div>');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;">Шаблон имени <font color="red"><sup>beta</sup></font> <input type="text" id="lw_template" size="38" value="%GENDER%"> &nbsp; <button id="lwb_check" style="margin: 5px 0 0 0;" onclick="check_shablon()" class="button button-style-0"><span class="button-align-0"><span class="button-inner-0"><span class="button-text-0">Проверить шаблон</span></span></span></button> <br> Можно назначить шаблон, по которому будут именоваться все рожденные жеребята. Список возможных параметров:  </div>');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px; font-size: 11px;"><b>%NAME%</b> - Имя, выбирается одно из нормальных имен в зависимости от пола <br><b>%GENDER%</b> - пол жеребенка (Жеребец или Кобыла)<br><b>%GENDER_MIN%</b> - Сокращенное написание пола (Жер или Коб)<br><b>%GP%</b> - генетический потенциал  <br><b>%SKILLS%</b> - сумма навыков </div> ');
	$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px; font-size: 11px;">  В качестве разделителя между параметрами можно использовать символы: пробел, запятая, <b>-</b>, <b>|</b>  <br> Стоит учесть, что максимальная длина имени не может превышать 20 символов, поэтому перед сохранением рекомендуется нажимать кнопку "Проверить шаблон". <br> <br> <b>Примеры шаблонов: </b> <br>  <b>%NAME% %SKILLS% </b> - будет выглядеть Афродита 77.54 <br> <b>%GENDER%|%GP%</b> будет выглядеть, как Кобыла|3677.54</div> ');

	$('.lwb_settings').append('<br><center><button id="lwb_savesettings" style="margin: 5px 0 0 0;" onclick="savesettings();" class="button button-style-0"><span class="button-align-0"><span class="button-inner-0"><span class="button-text-0">Сохранить</span></span></span></button></center>');


}



$('.lwb_setting').click(function(){
	$('.lwb_settings').toggle("slow");
});

$('.fear').click(function(){
	fear();
});

$('.lwb_chat_button').click(function(){
	$('.lwb_chat').toggle("slow");
});

$('#lwb_savesettings').click(function(){
	savesettings();
});

$('#lwb_check').click(function(){
	check_shablon();
});

function get_sluchka()
{
	$.post(
	"https://www.lowadi.com/elevage/chevaux/reserverJument",
	{
id:	chevalId,
action:	"save",
type:	"public",
price:	SL_option
	});
}

function sluchka()
{
	if (chevalEnergie>64) {
		if ($("#reproduction-wrapper:contains('Покрыть')").text()!=="")
		{
			if ($("#slchkbx").prop("checked"))
			setTimeout(get_sluchka(),50);
		}
	}
}


function horsename(shablon)
{
	/*
	Шаблоны для задания имени:

	NAME - имя коня\кобылы, выбирается из списка
	GENDER - Пол, значения: Жеребец, Кобыла
	GENDER_MIN - сокращенный пол: Жер, Коб
	GP - генетический потенциал
	SKILLS - навыки

	*/
	var out = new Array();
	var hname = "";
	var male_names = "Снежок,Агат, Азарт,Авалон,Аверон,Алый,Ангел,Амулет,Вольт,Ветер,Вегас,Вираж,Восток,Викинг,Воланд,Виспер,Вереск,Вирго,Оскар,Оникс,Олимп,Озар,Онис,Ойххо,Орик,Омар,Персик,Прайд,Принц,Пион,Плуто,Памир,Пэйн,Пунш,Плутон,Приор,Пульс,Перри,Пауэр,Пафос,Перчик";
	var female_names = "Адель,Агата,Ариэль,Агния,Анна,Бель,Волна,Веста,Вега,Ваниль,Верба,Вики,Вирия,Викси,Вуди,Вария,Варна,Ветта,Вилма,Вупи,Виола,Оззи,Осень,Омега,Опера,Офея,Ола,Олли,Окси,Прага,Пайпер,Персия,Пурга,Прима,Проза,Пеппи,Помпея,Пепер,Палада,Призма,Павия,Пенни";

	gender = $("#characteristics-body-content").find("td:contains('Пол')").text();
	gender = gender.replace("Пол: ","");


	var a = shablon.split('%');
	var SH = "NAME,GENDER,GENDER_MIN,GP,SKILLS";
	var SH_mas = SH.split(',');



	for (var i=0; i<a.length; i++)
	{
		for (var y=0; y<SH_mas.length; y++)
		{
			if (a[i] == SH_mas[y])
			out[i] = a[i];
			if(a[i] == " " || a[i] == "|" || a[i] == "," || a[i] == "-"  )
			out[i] = a[i];
		}
	}

	for (j=0; j<out.length; j++)
	{
		if (out[j] == "GENDER") hname+=gender;
		if (out[j] == "GENDER_MIN")
		{
			hname+=gender.substring(0,3);
			if (hname=="кон") hname = "жер";
		}

		if (out[j] == "NAME")
		{
			if (gender=="кобыла")
			{
				var f_names = female_names.split(",");
				f_name = f_names[Math.floor(Math.random() * (f_names.length - 1)) + 1];
				hname+=f_name+" ";
			}
			else
			{
				var m_names = male_names.split(",");
				m_name = m_names[Math.floor(Math.random() * (m_names.length - 1)) + 1];
				hname+=m_name+" ";
			}
		}

		if (out[j] == "GP")
		{
			gp = $("#genetic-body-content").find(".align-right:first").text();
			gp = gp.replace("Итог: ","");
			hname+=gp+" ";
		}

		if (out[j] == "SKILLS")
		{
			nav = $('#competencesValeur').text();
			hname+=nav+" ";
		}

		if(out[j] == " " || out[j] == "|" || out[j] == "," || out[j] == "-")
		hname+=out[j];
	}
	var realname = $('.horse-name').text();
	realname = realname.slice(0, -1);
	localStorage.setItem("horse_status", "3");
	if (realname!==hname)
	{
		console.log("New name = "+hname);
		setTimeout(giveName(hname),200);
	}


}


function giveName(Horsename)
{

	var pause = 0;
	var pause1 = pause + getRandomPause(100,200);
	setTimeout(function(){
		document.getElementById('widget--1').click();
	},pause1);
	var pause2 = pause1 + getRandomPause(100,200);
	setTimeout(function(){
		document.getElementsByClassName('options-menu')[0].getElementsByClassName('first')[0].getElementsByTagName('a')[2].click();
	},pause2);
	var pause3 = pause2 + getRandomPause(100,200);
	setTimeout(function(){
		var d =document.getElementById('horseNameName');
		d.value = Horsename;
	},pause3);

	var pause4 = pause3 + 200;
	setTimeout(function (){
		if (Affixe!='')
			$("#horseNameAffixe option:contains('"+Affixe+"')").attr("selected", "selected");
		else {
		var d = document.getElementById('horseNameAffixe').getElementsByTagName('optgroup')[1].getElementsByTagName('option')[0];
		d.setAttribute('selected','selected');
			}
	},pause4);

	var pause6 = pause4 + getRandomPause(100,200);
	setTimeout(function(){
		document.getElementById('profil-popup-content').getElementsByClassName('spacer-small-top button button-style-0')[0].click();
	},pause6);
}


function check_shablon()
{
	var shablon = $("#lw_template").val();
	var out = new Array();
	var len = 0;
	var a = shablon.split('%');
	var SH = "NAME,GENDER,GENDER_MIN,GP,SKILLS";
	var SH_mas = SH.split(',');

	for (var i=0; i<a.length; i++)
	{
		for (var y=0; y<SH_mas.length; y++)
		{
			if (a[i] == SH_mas[y])
			out[i] = a[i];
			if(a[i] == " " || a[i] == "|" || a[i] == "," || a[i] == "-"  )
			out[i] = a[i];
		}
	}


	for (j=0; j<out.length; j++)
	{
		if (out[j] == "GENDER") len+=7;
		if (out[j] == "GENDER_MIN") len+=3;
		if (out[j] == "NAME") len+=6;
		if (out[j] == "GP") len+=7;
		if (out[j] == "SKILLS") len+=7;
		if(out[j] == " " || out[j] == "|" || out[j] == "," || out[j] == "-") len+=1;

	}

	if (len<20) alert('Шаблон проверен, все ок!');
	if (len>20) alert("Ошибка! Имя получится более 20 символов, что приведет к ошибкам. Используйте меньше параметров");
	if (len==20) alert("Мда. 20 символов, возможно и прокатит, но возможно и будут сыпаться ошибки. Лучше попытаться сократить шаблон");
}



function fear()
{

	var audio = new Audio();
	audio.preload = 'auto';
	audio.src = 'https://raw.githubusercontent.com/Crasher69/lowadi/master/z.mp3';
	audio.play();
}

function randpos()
{
	let v =	Math.floor(Math.random() * (40 - 20 + 1)) + 20;
	return v;
}

function groom2()
{
	var str = $("#form-do-groom").serialize();
	str = str.replace(new RegExp('form-do-groom', 'g'), '');
	str = str.replace('=0&', '='+randpos()+'&');
	str = str.substring(0, str.length - 1);
	str = str+randpos();
	str = str.toLowerCase();
	//console.log(str);

	$.post("https://www.lowadi.com/elevage/chevaux/doGroom", str);

}



function stroke2()
{
	var str = $("#form-do-stroke").serialize();
	str = str.replace(new RegExp('form-do-stroke', 'g'), '');
	str = str.replace('=0&', '='+randpos()+'&');
	str = str.substring(0, str.length - 1);
	str = str+randpos();
	str = str.toLowerCase();
	//console.log(str);

	$.post("https://www.lowadi.com/elevage/chevaux/doStroke", str);

}


function drink2()
{
	var str = $("#form-do-drink").serialize();
	str = str.replace(new RegExp('form-do-drink', 'g'), '');
	str = str.replace('=0&', '='+randpos()+'&');
	str = str.substring(0, str.length - 1);
	str = str+randpos();
	str = str.toLowerCase();
	//console.log(str);

	$.post("https://www.lowadi.com/elevage/chevaux/doDrink", str);
	new Action.Cheval(this, '/doDrink').send();
}
