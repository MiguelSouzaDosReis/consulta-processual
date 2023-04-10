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
            expect( response.data[0].cnj).toStrictEqual("5001683-88.2020.8.13.0672")
            expect( response.data[0].autor).toStrictEqual("Ana Carla")
            expect( response.data[0].reu).toStrictEqual("José Eugênio")
            expect( response.data[0].tribunal).toStrictEqual("TJMG")
    })

    it('should work with CNJ' , async () =>{
        let searchTerm = '5001685-88.2020.8.13.0672'
        const response = await axios.get(`http://${backend_url}:3005/search/${searchTerm}`)
            expect(response.status).toBe(200);
            expect(response.data.hasOwnProperty(
                'cnj',
                "autor",
                "reu",
                "tribunal",
                "data",
                "movimentacoes",
                "descricao",
                "data"
                )).toBe(true)
            expect( response.data.cnj).toStrictEqual("5001685-88.2020.8.13.0672")
            expect( response.data.autor).toStrictEqual("José Carlos")
            expect( response.data.reu).toStrictEqual("Maria da Silva")
            expect( response.data.tribunal).toStrictEqual("TJSP")

    })

})

describe('page' , () =>{
    it('should render Search', () => {
        let searchTerm = 'TJMG'
        let context =  {  searchTerm }
        render(
            <MemoryRouter>
                <MyContext.Provider value={ context }>
                    <Search />
                </MyContext.Provider>
            </MemoryRouter>
        )
        const title = "Buscar"
        const select = "Selecione um tribunal para lista os processos ou buscar pelo número unificado"

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

        let document = [
            {
                _id: "642c95bb8cc23fa15b074fd9",
                cnj: "5001683-88.2020.8.13.0672",
                autor: "Ana Carla",
                reu: "José Eugênio",
                tribunal: "TJMG",
                data: "2023-02-03T03:00:00.000Z",
                movimentacoes: [
                    {
                        _id: "64320386c95cbd1716c8e1c9",
                        descricao: "juntada de inicial",
                        data: "2023-02-03T03:00:00.000Z"
                    }
                ]
            }
        ]

        let context =  {  searchTerm, document }
        render(
            <MemoryRouter>
                <MyContext.Provider value={ context }>
                    <Search />
                    <ShowTheProcess />
                </MyContext.Provider>
            </MemoryRouter>
        )

        const lawSuit = `Processo nº : 5001683-88.2020.8.13.0672`
        const autorAndReu = `Ana Carla (Autor) x José Eugênio (Réu)`

        expect(screen.getAllByText(lawSuit))
        expect(screen.getAllByText(autorAndReu))

        const tribunal = `TJMG - 03/02/2023`
        const moviment = "Movimentações:"

        expect(screen.getAllByText(tribunal))
        expect(screen.getAllByText(moviment))

        const dataOfMoviment = `juntada de inicial: 03/02/2023`

        expect(screen.getAllByText(dataOfMoviment))

    })
})
