var x=null;
         function faturaDown(){
         	var paracik=$('.fatura-son-toplam').find('span').eq(0).text();
         	paracik=encodeURIComponent(paracik);
         	$('.swal2-gizle').show();
         	var noBorder=false;
         	if ($('.swal2-content').find('.ozelTablo').css("border-width")=="1px"){
         		$('.swal2-content').find('.ozelTablo').css("border","0px");
         		noBorder=true;
         	}
         	$('.faturaindir').text("İndiriliyor..");
         	$('.faturaindir').prop("disabled",true);
         	$('.faturaindir').hide();
         	$('.swal2-content').css("background-color","white");
         	$('.swal2-content').css("min-width","600px");
         	var node = $('.swal2-content').get(0);
         	domtoimage.toJpeg(node)
         	.then(function (imageURL) {
         		$('.swal2-content').css("min-width","unset");
         		if (noBorder==true){
         			$('.swal2-content').find('.ozelTablo').css("border","1px solid");
         		}
         		$('.swal2-gizle').hide();
         		let a = document.createElement("a");
         		a.href = imageURL;
         		a.download = "sonuc.jpg";
         		a.click();
				 
				 if (navigator.userAgent.match(/(iPod|iPhone|iPad|Safari|Mac OS)/)) {
					setTimeout(function(){
						let twitter_a = document.createElement("a");
						twitter_a.href = 'https://twitter.com/intent/tweet?url=128milyardolar.net&text=Ben $'+paracik+' harcayabildim. Bakalım sen ne kadar harcayabileceksin? %23128MilyarDolarNerede %23128MilyarChallenge';
						twitter_a.click();
					}, 3000);
				 }
				 else{
					let twitter_a = document.createElement("a");
						twitter_a.href = 'https://twitter.com/intent/tweet?url=128milyardolar.net&text=Ben $'+paracik+' harcayabildim. Bakalım sen ne kadar harcayabileceksin? %23128MilyarDolarNerede %23128MilyarChallenge';
						twitter_a.click();
				 }
				
         	})
         	.catch(function (error) {
         		console.error('oops, something went wrong!', error);
         	});
         }
         function sinirla(){
         	var genislik = $(window).width();
         	console.log(genislik);
         	$('main').css("max-width",(parseInt(genislik)) + 'px');
         }
         sinirla();
         $( window ).resize(function() {
         	sinirla();
         });
         $('.harcamayi-bitir-btn').click(function(){
         	if ($( ".list-toplam" ).length>0){
         		Swal.fire({
         						title: 'Tebrikler!',
         						icon: 'success',
         						html: '<img src="_assets/img/logo.png" class="swal2-gizle" style="padding-top:30px;margin-bottom: 10px;"><br>128 Milyar</b>dan <b>$'+$('.fatura-son-toplam').find('span').text()+'</b> harcandı, <b>$'+$('#para').text()+'</b> Kaldı.<br><br>' + $('#fatura').html() + '<br>Harcamanızı başarıyla tamamladınız.<br><h5 class="swal2-gizle" style="padding-top: 10px;">www.128milyardolar.net</h5><br><button type="button" class="swal-btn swal2-styled faturaindir" style="display: inline-block;margin-bottom: -20px;margin-top: 25px;" onclick="faturaDown();">Sonucu Kaydet & Paylaş</button>',
         						showCloseButton: true,
         						showCancelButton: false,
         						showConfirmButton: true,
         						confirmButtonText: 'Peki Bu Parayla Neler Yapılabilirdi?',
         						width: 800
         		}).then(function(){
         			$('.swal2-content').css("padding","0px");
         			Swal.fire({
         				html: '<img src="_assets/img/bilgi_banner.png">',
         				showCloseButton: true,
         				showCancelButton: false,
         				showConfirmButton: false,
         				confirmButtonText: 'Anladım!',
         				width: 800
         			});
         		});
         	}
         	else{
         		Swal.fire({
         						title: 'Hata..',
         						icon: 'error',
         						html:
         							'Önce biraz harcama yapmaya ne dersin?',
         						showCloseButton: true,
         						showCancelButton: false,
         						showConfirmButton: false,
         						focusDeny: true,
         						denyButtonText:
         							'Hemen!',
         						showDenyButton: true,
         					});
         	}
         });
         function faturaSonToplamGuncelle(){
         	if ($( ".list-toplam" ).length==0){
         		$('#fatura').hide();
         	}
         	var son_toplam=0;
         	$( ".list-toplam" ).each(function( index ) {
         		var ara_toplam=$(this).find('span');
         		ara_toplam=ara_toplam.text().replaceAll(",","");
         		ara_toplam=parseInt(ara_toplam);
         		son_toplam+=ara_toplam;
         	});
         	$('.fatura-son-toplam').find('span').text(numeral(son_toplam).format('0,0'));
         }
         function faturayaEkle(urun, fiyat){
         	$('#fatura').show();
         	urun=urun.replaceAll("\n","").replaceAll("	","").replaceAll('	',"").replaceAll('\r','');
         	var urun_satir=$('*[data-urun="'+urun+'"]');
         	if (urun_satir.length>0){
         		var adet=urun_satir.find('.list-adet').find('span').text();
         		var yeni_adet=parseInt(adet) + 1;
         		urun_satir.find('.list-adet').find('span').text(yeni_adet);
         		var birim_fiyat=urun_satir.find('.list-birimfiyat').find('span').text().replaceAll(",","");
         		var yeni_toplam=parseInt(birim_fiyat) * parseInt(yeni_adet);
         		yeni_toplam=numeral(yeni_toplam).format('0,0');
         		urun_satir.find('.list-toplam').find('span').text(yeni_toplam);
         		faturaSonToplamGuncelle();
         	}
         	else{
         		fiyat=numeral(fiyat).format('0,0');
         		$('#fatura').find('tbody').append('<tr class="fatura-list" data-urun="'+urun+'"> <td class="list-urun"><span>'+urun+'</span></td> <td class="list-adet"><span>1</span></td> <td class="list-birimfiyat">$<span>'+fiyat+'</span></td> <td class="list-toplam">$<span>'+fiyat+'</span></td> </tr>');
         		faturaSonToplamGuncelle();
         	}
         }
         function faturadanEksilt(urun, fiyat){
         	urun=urun.replaceAll("\n","").replaceAll("	","").replaceAll('	',"").replaceAll('\r','');
         	var urun_satir=$('*[data-urun="'+urun+'"]');
         	if (urun_satir.length>0){
         		var adet=urun_satir.find('.list-adet').find('span').text();
         		var yeni_adet=parseInt(adet) - 1;
         		if (yeni_adet>0){
         			urun_satir.find('.list-adet').find('span').text(yeni_adet);
         			var birim_fiyat=urun_satir.find('.list-birimfiyat').find('span').text().replaceAll(",","");
         			var yeni_toplam=parseInt(birim_fiyat) * parseInt(yeni_adet);
         			yeni_toplam=numeral(yeni_toplam).format('0,0');
         			urun_satir.find('.list-toplam').find('span').text(yeni_toplam);
         		}
         		else{
         			urun_satir.remove();
         		}
         		faturaSonToplamGuncelle();
         	}
         }
         function fiyatGuncelle(fark){
         	var para=$('#para').text();
         	para=para.replace(",","").replace(",","").replace(",","").replace(",","").replace(",","");
         	para=parseInt(para);
         	if ((para + fark)>=0){
         		var yeni_para=para+fark;
         		var yeni_para_formatted=numeral(yeni_para).format('0,0');
         		$('#para').text(yeni_para_formatted);
         	}
         }
         $(document).on('click','.satin-al-btn',function(){
         	var top_para=$('#para').text().replaceAll(",","");
         	if ($(this).attr("data-status")=="no-num"){
         		var fiyat=parseInt($(this).parents('.uruncuk').find('.fiyatcik').text().replaceAll(",",""));
         		if ((top_para - fiyat)>=0){
         			$(this).html('<div class="counterstyle__CounterBox-sc-8iu0h2-0 iMeRMz card-counter"><button class="counterstyle__CounterButton-sc-8iu0h2-1 hQDaWZ control-button eksi-btn"><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="2px" viewBox="0 0 12 2"><rect data-name="Rectangle 522" width="12" height="2" rx="1" fill="currentColor"></rect></svg></button><span class="counterstyle__CounterValue-sc-8iu0h2-2 fWCkFI sepetSayi">1</span><button class="counterstyle__CounterButton-sc-8iu0h2-1 hQDaWZ control-button arti-btn"><svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg></button></div>')
         			$(this).attr("data-status","num");
         			$(this).find(".arti-btn" ).unbind();
         			$(this).find(".eksi-btn" ).unbind();
         			fiyatGuncelle(-fiyat);
         			faturayaEkle($(this).parents('.uruncuk').find('.uruncuk-ad').text(), fiyat);
         			$(this).find('.arti-btn').click(function(){
         				top_para=$('#para').text().replaceAll(",","");
         				if ((top_para - fiyat)>=0){
         					var sayi=$(this).find(".sepetSayi");
         					sayiX=parseInt(sayi.end().parents('.card-counter').find('.sepetSayi').text());
         					sayi.end().parents('.card-counter').find('.sepetSayi').text(sayiX + 1);
         					fiyatGuncelle(-fiyat);
         					faturayaEkle($(this).parents('.uruncuk').find('.uruncuk-ad').text(), fiyat);
         				}
         				else{
         					Swal.fire({
         						title: 'Üzgünüz ama..',
         						icon: 'error',
         						html:
         							'Paranız ne yazık ki yeterli değil.',
         						showCloseButton: true,
         						showCancelButton: false,
         						showConfirmButton: false,
         						focusDeny: true,
         						denyButtonText:
         							'Peki :(',
         						showDenyButton: true,
         					});
         				}
         			});
         			$(this).find('.eksi-btn').click(function(){
         				var top_para=$('#para').text().replaceAll(",","");
         				var sayi=$(this).find(".sepetSayi");
         				sayiX=parseInt(sayi.end().parents('.card-counter').find('.sepetSayi').text());
         				if (sayiX>1){
         					sayi.end().parents('.card-counter').find('.sepetSayi').text(sayiX - 1);
         					fiyatGuncelle(+fiyat);
         					faturadanEksilt($(this).parents('.uruncuk').find('.uruncuk-ad').text(), fiyat);
         				}
         				else{
         					fiyatGuncelle(+fiyat);
         					faturadanEksilt($(this).parents('.uruncuk').find('.uruncuk-ad').text(), fiyat);
         					$(this).parents('.satin-al-btn').attr("data-status","no-num");
         					$(this).parents('.satin-al-btn').html('<button aria-label="add item to cart" class="add-item-to-cart__Button-sc-19xdvkq-1 byhaCB"> <div class="box__Box-sc-5533u7-0 oExpm">Satın Al</div> <span class="add-item-to-cart__Icon-sc-19xdvkq-0 bQxKjU"> <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewbox="0 0 10 10"> <path data-name="Path 9" d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z" transform="translate(-137.782 -137.783)" fill="currentColor"> </path> </svg> </span> </button>');
         				}
         			});
         		}
         		else{
         			Swal.fire({
         						title: 'Üzgünüz ama..',
         						icon: 'error',
         						html:
         							'Paranız ne yazık ki yeterli değil.',
         						showCloseButton: true,
         						showCancelButton: false,
         						showConfirmButton: false,
         						focusDeny: true,
         						denyButtonText:
         							'Peki :(',
         						showDenyButton: true,
         					});
         		}
         	}
         	else{
         		//console.log($(this).attr("data-status"));
         	}
         });
         
         window.onscroll = function() {stickyFunc()};
         var header = document.getElementById("para-blok");
         var sticky = header.offsetTop;
         function stickyFunc() {
         	if (window.pageYOffset > sticky) {
         		header.classList.add("sticky");
         		$('.urunList').css("margin-top","120px");
         	} else {
         		header.classList.remove("sticky");
         		$('.urunList').css("margin-top","40px");
         	}
         }
         $( document ).ready(function() {
         	$('#preloader').hide();
         });
