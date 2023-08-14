import { useEffect, useState } from 'react'
import getColor from '../../utils/getColor'
import styles from './styles.module.scss'
import { api } from '../../services/api'
import Modal from '../Modal/Modal'
import { useRouter } from 'next/router'
import { useAwardContext } from '../../context/saveAward'
import RouletteBackground from '../../assets//images/roulete-image.png'
import innerRoulette from '../../assets/images/inner-roulette.png'
import Image from 'next/image'
import MediaQuery, { useMediaQuery } from 'react-responsive'

export default function Roulette({ spinRoulette, setSpinRoulette, user, awards, setFormIsValid }: any) {
    const { setAwardWinner } = useAwardContext()
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    const [domLoaded, setDomLoaded] = useState(false)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1281px)' })

    let startAngle = 0;
    let arc = Math.PI / (awards.length / 2);
    let spinTimeout: any = null;

    let spinTime = 0;
    let spinTimeTotal = 0;

    let ctx;

    useEffect(() => {
        setDomLoaded(true)
    }, [])

    useEffect(() => {
        if (domLoaded)
            drawRouletteWheel()
    }, [domLoaded])

    useEffect(() => {
        async function load() {
            setFormIsValid(true)
            const verifyAccess = await hasPermission()
            if (verifyAccess) {
                await spin()
            } else {
                setOpenModal(true)
                setFormIsValid(false)
            }
        }
        if (spinRoulette) {
            load();
            setSpinRoulette(false)
        }
    }, [spinRoulette])

    async function hasPermission() {
        const { email, cpf } = user
        const data = { email, cpf }
        const res = await api.post('/hasPermissions', data)

        return res.data && res.data.success
    }

    function drawRouletteWheel() {
        var canvas: any = document.getElementById("wheelcanvas");
        if (canvas.getContext) {
            var outsideRadius = isTabletOrMobile ? 150 : 290;
            var textRadius = isTabletOrMobile ? 90 : 180;
            var insideRadius = 1;
            const positionCanvas = 350;

            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, 1000, 1000);

            ctx.strokeStyle = "black";
            ctx.lineWidth = 2

            ctx.font = `bold ${isTabletOrMobile ? '8px' : '16px'} Montserrat, sans-serif`;

            for (var i = 0; i < awards.length; i++) {
                var angle = startAngle + i * arc;
                ctx.fillStyle = getColor(i);

                ctx.beginPath();
                ctx.arc(positionCanvas, positionCanvas, outsideRadius, angle, angle + arc, false);
                ctx.arc(positionCanvas, positionCanvas, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();

                ctx.save();
                ctx.shadowOffsetX = -1;
                ctx.shadowOffsetY = -1;
                ctx.shadowBlur = 0;
                ctx.shadowColor = "rgb(220,220,220)";
                ctx.fillStyle = getColor(i + 1);
                ctx.translate(positionCanvas + Math.cos(angle + arc / 2) * textRadius, positionCanvas + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc * 4.6);
                var text = awards[i].description.toUpperCase();
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }
        }
    }

    let spinAngleStart: any;

    async function spin() {
        spinAngleStart = Math.random() * 10 + 10;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3 + 4 * 1000;
        await rotateWheel();
    }

    async function rotateWheel() {
        spinTime += 10;

        if (spinTime > spinTimeTotal && checkAwardAvailable()) {
            await stopRotateWheel();
            return;
        }
        console.log(spinTime, spinTimeTotal)
        var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI / 180);
        drawRouletteWheel();

        spinTimeout = setTimeout(rotateWheel, 30);
    }

    function checkAwardAvailable() {
        var degrees = startAngle * 180 / Math.PI + 90;
        var arcd = arc * 180 / Math.PI;
        var index = Math.floor((360 - degrees % 360) / arcd);
        return awards[index].count > 0
    }

    async function stopRotateWheel() {
        clearTimeout(spinTimeout);
        var degrees = startAngle * 180 / Math.PI + 90;
        var arcd = arc * 180 / Math.PI;
        var index = Math.floor((360 - degrees % 360) / arcd);
        send(awards[index].description)
    }

    function easeOut(t: any, b: any, c: any, d: any) {
        var ts = (t /= d + t) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    const send = async (award: string) => {
        try {
            const data = { ...user, award }
            const res = await api.post('/user', data)
            if (res.data && res.data.success) {
                setAwardWinner(award)
                router.push(`/congratulations`)
                return
            }
            setFormIsValid(false)
        } catch (err) {
            setOpenModal(true)
        }
    }

    return (
        <>
            {
                domLoaded &&
                <div className={styles.rouletteContainer}>
                    <Image src={RouletteBackground} />
                    <div className={styles.shadow}></div>
                    <div className={styles.innerRoulette}>
                        <Image src={innerRoulette} />
                    </div>
                    <MediaQuery maxWidth={1281}>
                        <canvas id="wheelcanvas" width={"500"} height={"500"}></canvas>
                    </MediaQuery>
                    <MediaQuery minWidth={1282}>
                        <canvas id="wheelcanvas" width="800" height="700"></canvas>
                    </MediaQuery>
                    <Modal title="Atenção!" visible={openModal} onClose={() => setOpenModal(false)} />
                </div>
            }
        </>
    )
}
