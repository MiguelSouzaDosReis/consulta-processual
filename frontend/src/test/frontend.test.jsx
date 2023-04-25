import axios from 'axios';
import { render, screen  } from '@testing-library/react'
import Search from '../pages/search';
import React from 'react';
import MyContext from '../context/myContext';
import { MemoryRouter } from 'react-router-dom';
import ShowTheProcess from '../pages/showTheProcess'

const backend_url = "backend"

describe('api search', () => {
    it('should work with court' , async () =>{
        let searchTerm = 'TJMG'
        const response = await axios.get(`http://${backend_url}:3005/search/${searchTerm}`)
            expect(response.status).toBe(200);
            console.log(response.data)
            expect(Array.isArray(response.data)).toBe(true);
            expect( response.data[0].cnj).toStrictEqual("5001683-88.2020.1.13.0672")
            expect( response.data[0].autor).toStrictEqual("Ana Carla")
            expect( response.data[0].reu).toStrictEqual("José Eugênio")
            expect( response.data[0].tribunal).toStrictEqual("TJMG")
    })

    it('should work with CNJ' , async () =>{
        let searchTerm = '5001685-88.2020.8.13.0672'
        const response = await axios.get(`http://${backend_url}:3005/search/${searchTerm}`)
            expect(response.status).toBe(200);

            if (response.data != null ) {

                expect(response.data.hasOwnProperty(
                    'cnj',
                    'autor',
                    'reu',
                    'tribunal',
                    'data',
                    'movimentacoes',
                    'descricao',
                    'data'
                )).toBe(true);
                expect( response.data.cnj).toStrictEqual("5001685-88.2020.8.13.0672")
                expect( response.data.autor).toStrictEqual("José Carlos")
                expect( response.data.reu).toStrictEqual("Maria da Silva")
                expect( response.data.tribunal).toStrictEqual("TJSP")
            }

    })

})


describe('page' ,  () =>{

    it('should render Search', () => {
        const mockAxiosGet = jest.spyOn(axios, 'get');

        let searchTerm = 'TJMG';

        let lawCourtData = [
            {
            cnj: "5001683-88.2020.1.13.0672",
            autor: "Ana Carla",
            reu: "José Eugênio",
            tribunal: "TJMG",
            data: "13/08/2023",
            movimentacoes: [ {"descricao": "juntada de inicial", "data": "02/03/2023"} ]
            }
        ]

        mockAxiosGet.mockResolvedValue({ data: lawCourtData });

        let tribunaisUnicos = Array.from(new Set(lawCourtData.map((element) => element.tribunal))).sort();

        render(
            <MemoryRouter>
                <MyContext.Provider value={ searchTerm }>
                    <Search tribunaisUnicos={ tribunaisUnicos }  />
                </MyContext.Provider>
            </MemoryRouter>
        )
        const title = "Buscar";
        const select = "Selecione um tribunal para lista os processos ou buscar pelo número unificado";

        expect(screen.getAllByText(title))
        expect(screen.getAllByText(select))

        const input = document.getElementById('cnj');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');

        const option = document.getElementById('Tribunal');
        expect(option).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /Buscar/i });
        expect(button).toBeInTheDocument();
    })


    it('should render ShowTheProcess', () => {
        let searchTerm = "5001683-88.2020.8.13.0672"

        const mockAxiosGet = jest.spyOn(axios, 'get');

        let document = [
            {
                cnj: ": 5001683-88.2020.1.13.0672",
                autor: "Ana Carla",
                reu: "José Eugênio",
                tribunal: "TJMG",
                data: "13/08/2023",
                movimentacoes: [ {"descricao": "juntada de inicial", "data": "02/03/2023"} ]
                }
        ]

        mockAxiosGet.mockResolvedValue({ data: document });

        let tribunaisUnicos = Array.from(new Set(document.map((element) => element.tribunal))).sort();

        let context =  {  searchTerm, document }
        render(
            <MemoryRouter>
                <MyContext.Provider value={ context }>
                    <Search tribunaisUnicos={ tribunaisUnicos } />
                    <ShowTheProcess />
                </MyContext.Provider>
            </MemoryRouter>
        )

        const lawSuit = `Processo nº : : 5001683-88.2020.1.13.0672`
        const autorAndReu = `Ana Carla (Autor) x José Eugênio (Réu)`

        expect(screen.getAllByText(lawSuit))
        expect(screen.getAllByText(autorAndReu))

        const tribunal = `TJMG - 13/08/2023`
        const moviment = "Movimentações:"

        expect(screen.getAllByText(tribunal))
        expect(screen.getAllByText(moviment))

        const dataOfMoviment = `juntada de inicial: 02/03/2023`

        expect(screen.getAllByText(dataOfMoviment))

    })
})
