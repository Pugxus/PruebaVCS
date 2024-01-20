import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marca, Modelo } from '../../Interfaces/vehiculo';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
// @ts-ignore
import CurrencyAPI from '@everapi/currencyapi-js';

@Component({
  selector: 'app-fipe',
  standalone: true,
  imports: [AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './fipe.component.html',
  styleUrl: './fipe.component.css',
})
export class FipeComponent implements OnInit {
  currency = new CurrencyAPI(
    'cur_live_OdMsN3nEZXHIav80bu8UDGzdRXMYm5q1MquEW4yg'
  );

  formulario: FormGroup;
  marcas: any = [];
  modelos: any = [];
  anios: any = [];
  mostrarDetalles: boolean = false;
  detalles: any = {};
  conversion: number | null = null;
  impuesto: any;
  valorImpuesto: any;

  constructor(private service: ApiService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      tipoVehiculo: [''],
      marca: [''],
      modelo: [''],
      anio: [''],
    });
  }

  ngOnInit(): void {
    const tipoVehiculoControl = this.formulario.get('tipoVehiculo');
    if (tipoVehiculoControl) {
      tipoVehiculoControl.valueChanges.subscribe((valorTipoVehiculo) => {
        this.marcas = [];
        this.modelos = [];
        this.anios = [];
        this.mostrarDetalles = false;
        this.detalles = {};
        this.conversion = null;
        this.getAllMarcas(valorTipoVehiculo);
        const marca = this.formulario.get('marca');
        if (marca) {
          marca.valueChanges.subscribe((valorMarca) => {
            this.modelos = [];
            this.anios = [];
            this.mostrarDetalles = false;
            this.detalles = {};
            this.conversion = null;
            this.getAllModelos(valorTipoVehiculo, valorMarca);
            const modelo = this.formulario.get('modelo');
            if (modelo) {
              modelo.valueChanges.subscribe((valorModelo) => {
                this.anios = [];
                this.mostrarDetalles = false;
                this.detalles = {};
                this.conversion = null;
                this.getAllAnios(valorTipoVehiculo, valorMarca, valorModelo);
                const anio = this.formulario.get('anio');
                if (anio) {
                  anio.valueChanges.subscribe((valorAnio) => {
                    this.conversion = null;
                    this.getValores(
                      valorTipoVehiculo,
                      valorMarca,
                      valorModelo,
                      valorAnio
                    );
                  });
                }
              });
            }
          });
        }
      });
    }
  }

  getAllMarcas(tipo: any): void {
    this.service.getMarcas(tipo).subscribe((data: {}) => {
      this.marcas = data;
      console.log(this.marcas);
    });
  }

  getAllModelos(tipo: any, marca: any): void {
    this.service.getModelos(tipo, marca).subscribe((data: any) => {
      this.modelos = data.modelos;
      console.log(this.modelos);
    });
  }

  getAllAnios(tipo: any, marca: any, modelo: any): void {
    this.service.getAnios(tipo, marca, modelo).subscribe((data: any) => {
      this.anios = data;
      console.log(this.anios);
    });
  }

  getValores(tipo: any, marca: any, modelo: any, anio: any): void {
    this.service.getValor(tipo, marca, modelo, anio).subscribe((data: any) => {
      this.detalles = {
        Valor: data.Valor,
        Marca: data.Marca,
        Modelo: data.Modelo,
        AnoModelo: data.AnoModelo,
        Combustivel: data.Combustivel,
      };
      if (this.detalles && this.detalles.Combustivel) {
        if (this.detalles.Combustivel === 'Gasolina') {
          this.impuesto = "5%";
          const numero =
            this.detalles.Valor.match(/\d+/g)?.join('');
          const Entero = numero.slice(0, -2);
          this.valorImpuesto = Entero * 0.05;
        } else if (this.detalles.Combustivel === 'Diesel') {
          this.impuesto = "2.5%"
          const numero =
            this.detalles.Valor.match(/\d+/g)?.join('');
          const Entero = numero.slice(0, -2);
          this.valorImpuesto = Entero * 0.025;
        } else if (this.detalles.Combustivel === 'Eléctrico') {
          this.impuesto = "1%"
          const numero =
            this.detalles.Valor.match(/\d+/g)?.join('');
          const Entero = numero.slice(0, -2);
          this.valorImpuesto = Entero * 0.01;
        }
      }
      this.mostrarDetalles = true;
      console.log(this.detalles);
    });
  }

  convertir(): void {
    this.currency
      .latest({
        base_currency: 'BRL',
        currencies: 'COP',
      })
      .then((data: any) => {
        const numerosConDecimales = this.detalles.Valor.match(/\d+/g)?.join('');
        const parteEntera = numerosConDecimales.slice(0, -2);

        console.log(parteEntera);
        console.log(data.data.COP.value);

        this.conversion = parteEntera * data.data.COP.value;

        console.log(this.conversion);
      });
  }

  resetForm(): void {
    this.formulario.reset();
    this.marcas = [];
    this.modelos = [];
    this.anios = [];
    this.conversion = null;
    this.mostrarDetalles = false;
    this.detalles = {};
  }
}
