import { Container, Table } from "react-bootstrap";
import SmjerService from "../../services/SmjerService";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Button } from "react-bootstrap/lib/InputGroup";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";



export default function SmjeroviPregled(){

    const[smjerovi,setSmjerovi] = useState();

    async function dohvatiSmjerove() {

        
        await SmjerService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setSmjerovi(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    useEffect(()=>{
        dohvatiSmjerove();
    },[]);

    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD. MM. YYYY.');
    }

    function vaucer(v){
        if(v==null) return 'gray';
        if(v) return 'green';
        return 'red'
    }

    async function obrisiAsync(sifra) {
        const odgovor = await SmjerService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiSmjerove();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.SMJER_NOVI}> Dodaj novi smjer</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena</th>
                        <th>Izvodi se od</th>
                        <th>Vaučer</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {smjerovi && smjerovi.map((smjer,index)=>(
                        <tr key={index}>
                            <td>{smjer.naziv}</td>
                            <td className={smjer.trajanje==null ? 'sredina' : 'desno'}>
                                {smjer.trajanje==null ? 'Nije definirano' : smjer.trajanje}
                                
                                </td>
                            <td className={smjer.cijena==null ? 'sredina' : 'desno'}>

                                {smjer.cijena==null
                                ? 'Nije definirano'
                                : 
                                <NumericFormat 
                                value={smjer.cijena}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2}
                                fixedDecimalScale
                                />
                            }

                            </td>
                            <td className={'sredina'}>
                                {formatirajDatum(smjer.izvodiSeOd)}
                            </td>
                            <td className={'sredina'}>
                                <GrValidate 
                                size={30}
                                color={vaucer(smjer.vaucer)}
                                />
                            </td>
                            <td>
                                <Button
                                variant="danger"
                                onClick={()=>obriši(smjer.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}