import React from 'react'
import { Table } from 'reactstrap';

export default function Setlist() {
  const setlist = [
    {id: 'M01.', song: 'Overture!'},
    {id:' M02.', song: 'Seishun Girls (Gadis Gadis Remaja)'},
    {id: 'M03.', song:' Beach Sandal'},
    {id: 'M04.', song: 'Kimi ga Hoshi ni Naru Made (Sampai Dirimu Menjadi Bintang)'},
    {id: 'M05.', song: 'Blue Rose'},
    {id: 'M06.', song: 'Kinjirareta Futari (Dua Orang yang Terlarang)'},
    {id: 'M07.', song: 'Ame no Doubutsuen (Kebun Binatang di Saat Hujan)'},
    {id: 'M08.', song: 'Fushida na Natsu (Musim Panas yang Kacau)'},
    {id: 'M09.', song: 'Don t Disturb!'},
    {id: 'M10.', song: 'Virgin Love'},
    {id: 'M11.', song: 'Hizuke Henkousen (Garis Pergantian Hari Cinta)'},
    {id: 'M12.', song: 'Boku no Uchiage Hanabi (Kembang Api Milikku)'},
    {id: 'M13.', song: 'Yakusoku Yo (Janji Ya)'},
    {id: 'M14.', song: 'Korogaru Ishi Ni Nare (Jadilah Batu yang Berputar)'},
    {id: 'M15.', song: 'Cinderella wa Damasarenai (Cinderella yang Tak Akan Tertipu)'},
  ];

  return (
    <Table dark>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Lagu</th>
        </tr>
      </thead>
      {setlist.map((item) => (
        <tbody>
          <tr>
            <th scope="row">{item.id}</th>
            <td>{item.song}</td>
          </tr>
        </tbody>
      ))}
    </Table>
  )
}

  