import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireList, AngularFireDatabase,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
 
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
 
    @ViewChild('lineCanvas') lineCanvas;
    lineChart: any;
	public  temp: Observable<any>;
 
    constructor(public navCtrl: NavController, public afd: AngularFireDatabase,public afAuth: AngularFireAuth) {
 
    }
 
    ionViewDidLoad() {
		
		this.afAuth.authState.subscribe((user: firebase.User) => {
		var temp1 = user.email.toString();
		var email="";
		var i;
		for(i of temp1){
			if(i == "."){
				break;
			}else{
				email+=i;
			}
		}
		console.log(email);
		var str="Users/";
		var str2="/Full Report/";
		var str3=email;
		console.log(email,"email");
		console.log(str+email+str2);
		this.temp = this.afd.object(str+email+str2).valueChanges().map(j =>{
			var Months = [];
			var name="Date";
			console.log(j);
			var arr = [];
			var k =1;
			//data_arr.push(j[k].Level);
			while(k!=0){
					try{
						arr.push(j[k].Date);
						k++;
					}
					catch(error){
						break;
					}
			}
			console.log(j, "j is here");
			var data_arr = [];
			k = 1;
			while(k!=0){
					try{
						data_arr.push(j[k].Level);
						k++;
					}
					catch(error){
						break;
					}
			}
			console.log(data_arr,"array");
		Chart.defaults.global.legend.display = false;
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: arr,
                datasets: [
                    {
						display:false,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: data_arr,
                        spanGaps: false,
                    }
                ]
				
            },
			 options: {
					scales: {
						yAxes: [{
							ticks: {
            beginAtZero: true
          },
							scaleLabel: {
					display: true,
					labelString: 'Contamenent Level',
					fontColor : '#FF0000',
					fontSize:10
				  },
						stacked: true
						}],
						xAxes: [{
							scaleLabel: {
					display: true,
					labelString: 'Date',
					fontColor: '#FF0000',
				  }
						}]
					}
				}
        });
		});
	});
    }
 
 
}