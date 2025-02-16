
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        listOrderCards: [
            {
                id: 1,
                image: '/image/works/1.png',
                title: 'Дипломная работа',
                DateStart: '7 июля',
                DateEnd: '12 июля',
                imageUser: '/image/works/user.svg',
                nameUser: 'Алексей',
                rating: '8.5',
                description: 'If you find this creation appealing, why not extend your appreciation to the talented minds Ive mentioned? ',
                price: 5000,
            },
            {
                id: 2,
                image: '/image/works/2.png',
                title: 'Дипломная работа',
                DateStart: '7 июля',
                DateEnd: '12 июля',
                imageUser: '/image/works/user.svg',
                nameUser: 'Никита',
                rating: '8.9',
                description: 'If you find this creation appealing, why not extend your appreciation to the talented minds Ive mentioned? ',
                price: 5000,
            },
            {
                id: 3,
                image: '/image/works/3.png',
                title: 'Дипломная работа',
                DateStart: '7 июля',
                DateEnd: '12 июля',
                imageUser: '/image/works/user.svg',
                nameUser: 'Никита',
                rating: '8.9',
                description: 'If you find this creation appealing, why not extend your appreciation to the talented minds Ive mentioned? ',
                price: 5000,
            },
            {
                id: 4,
                image: '/image/works/4.png',
                title: 'Дипломная работа',
                DateStart: '7 июля',
                DateEnd: '12 июля',
                imageUser: '/image/works/user.svg',
                nameUser: 'Никита',
                rating: '8.9',
                description: 'If you find this creation appealing, why not extend your appreciation to the talented minds Ive mentioned? ',
                price: 5000,
            },
            {
                id: 5,
                image: '/image/works/5.png',
                title: 'Дипломная работа',
                DateStart: '7 июля',
                DateEnd: '12 июля',
                imageUser: '/image/works/user.svg',
                nameUser: 'Никита',
                rating: '8.9',
                description: 'If you find this creation appealing, why not extend your appreciation to the talented minds Ive mentioned? ',
                price: 5000,
            },
            {
                id: 6,
                image: '/image/works/6.png',
                title: 'Дипломная работа',
                DateStart: '7 июля',
                DateEnd: '12 июля',
                imageUser: '/image/works/user.svg',
                nameUser: 'Никита',
                rating: '8.9',
                description: 'If you find this creation appealing, why not extend your appreciation to the talented minds Ive mentioned? ',
                price: 5000,
            },
        ],
        listUsers: [
            {
                id: 1,
                name: "Алексей Чацкий",
                jobTitle: "Специалист в математике",
                state: "Accepted",
                image: "/image/avatar/LogoUser.png",
                email: 'bM4t0@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/alekschatskiy' },
                    { platform: 'github', link: 'https://github.com/alekschatskiy' }
                ],
                speciality: 'Математика',
                university: 'МГТУ им. Баумана',
                Faculty: 'Математика и информатика',
                department: 'Математический',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь дипломированным химиком с 5-летним опытом работы в различных научно-исследовательских лабораториях. Обладаю глубокими знаниями в области химических наук и постоянно совершенствую свои навыки. Ответственно подхожу к выполнению любых заказов, гарантируя высокое качество  и точность результатов. Всегда открыт к сотрудничеству и готов оказать помощь в решении сложных химических задач.'
            },
            {
                id: 2,
                name: "Виктор Захаров",
                jobTitle: "Специалист в информатике",
                state: "rejected",
                image: "/image/avatar/LogoUser.png",
                email: 'j6zZM@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/viktorzaharov' },
                    { platform: 'vkontacte', link: 'https://vk.com/viktorzaharov' }
                ],
                speciality: 'Информатика',
                university: 'СПбГУ',
                Faculty: 'Математика и информатика',
                department: 'Информатика',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: ''
            },
            {
                id: 3,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "postponed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            },
            {
                id: 4,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "Unreviewed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            },
            {
                id: 5,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "Unreviewed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            },
            {
                id: 6,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "Unreviewed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            },
            {
                id: 7,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "Unreviewed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            },
            {
                id: 8,
                name: "Виктория Лытова",
                jobTitle: "Специалист в химии",
                state: "Unreviewed",
                image: "/image/avatar/LogoUser.png",
                email: 'sQpMl@example.com',
                social: [
                    { platform: 'telegram', link: 'https://t.me/victoria_lytova' },
                ],
                speciality: 'Химия',
                university: 'СПбГУ',
                Faculty: 'Химическая',
                department: 'Химия',
                course: '3',
                studentID: '123456789',
                Disciplines: [
                    { name: 'Общая физика',},
                    { name: 'Общая биология', },
                    { name: 'Общая химия', },
                    { name: 'Общая математика', },
                ],
                description: 'Я являюсь химиком'
            },
        ],
        reviews: [
            {
                id: 1,
                subject: 'Высшая математика',
                data: '01.01.2023',
                title: 'Курсовая работа',
                rating: 3,
                text: 'Как принято считать, стремящиеся вытеснить традиционное производство, нанотехнологии, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут превращены в посмешище, хотя само их существование приносит несомненную пользу обществу! '
            },
            {
                id: 2,
                subject: 'Информационные технологии',
                data: '01.01.2023',
                title: 'Лабораторная работа',
                rating: 4,
                text: 'Следует отметить, что высокое качество позиционных исследований способствует подготовке и реализации экономической целесообразности принимаемых решений.'
            },
            {
                id: 3,
                subject: 'Физика',
                data: '01.01.2023',
                title: 'Лабораторная работа',
                rating: 3,
                text: 'Следует отметить, что высокое качество позиционных исследований способствует подготовке и реализации экономической целесообразности принимаемых решений.'
            }
        ],
        CommunititesCards: [
            {
                id: 1,
                title: 'Название',
                rating: 4.8,
                description: 'We are a web and mobile design and development agency. Making websites and apps, creating brand identities, and launching startups. ',
                member: 12,
                image: '/image/communities/1.png',
                price: 2500,
                imageUser: '/image/works/user.svg',
                sybject: [
                    {
                        name: 'Русский язык',
                        member: 8,
                        rating: 4.8,
                    },
                    {
                        name: 'Английский язык',
                        member: 3,
                        rating: 4.8,
                    },
                    {
                        name: 'Французский язык',
                        member: 6,
                        rating: 4.8,
                    }
                ],
                captain: [
                    {
                        name: 'Дмитрий Иванов',
                        sybject: 'Математика',
                        rating: 9.8
                    }
                ],
                team: [
                    {
                        name: 'Антон Горелов',
                        subject: 'Русский язык',
                        rating: 7.2,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Вачеслав Стонков',
                        sybject: 'Математика',
                        rating: 9,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Игорь Владимирович',
                        subject: 'Информатика',
                        rating: 5,
                        imageUser: '/image/works/user.svg',
                    }
                ]
            },
            {
                id: 2,
                title: 'Название',
                rating: 3.8,
                description: 'We are a web and mobile design and development agency. Making websites and apps, creating brand identities, and launching startups. ',
                member: 6,
                image: '/image/communities/2.png',
                price: 2500,
                imageUser: '/image/works/user.svg',
                sybject: [
                    {
                        name: 'Русский язык',
                        member: 8,
                        rating: 4.8,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Английский язык',
                        member: 3,
                        rating: 4.8,
                    },
                    {
                        name: 'Французский язык',
                        member: 6,
                        rating: 4.8,
                    }
                ],
                captain: [
                    {
                        name: 'Дмитрий Иванов',
                        sybject: 'Математика',
                        rating: 9.8
                    }
                ],
                team: [
                    {
                        name: 'Антон Горелов',
                        subject: 'Русский язык',
                        rating: 7.2,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Вачеслав Стонков',
                        sybject: 'Математика',
                        rating: 9,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Игорь Владимирович',
                        subject: 'Информатика',
                        rating: 5,
                        imageUser: '/image/works/user.svg',
                    }
                ]
            },
            {
                id: 3,
                title: 'Название',
                rating: 2.8,
                description: 'We are a web and mobile design and development agency. Making websites and apps, creating brand identities, and launching startups. ',
                member: 4,
                image: '/image/communities/3.png',
                price: 2500,
                imageUser: '/image/works/user.svg',
                sybject: [
                    {
                        name: 'Русский язык',
                        member: 8,
                        rating: 4.8,
                    },
                    {
                        name: 'Английский язык',
                        member: 3,
                        rating: 4.8,
                    },
                    {
                        name: 'Французский язык',
                        member: 6,
                        rating: 4.8,
                    }
                ],
                captain: [
                    {
                        name: 'Дмитрий Иванов',
                        sybject: 'Математика',
                        rating: 9.8
                    }
                ],
                team: [
                    {
                        name: 'Антон Горелов',
                        subject: 'Русский язык',
                        rating: 7.2,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Вачеслав Стонков',
                        sybject: 'Математика',
                        rating: 9,
                        imageUser: '/image/works/user.svg',
                    },
                    {
                        name: 'Игорь Владимирович',
                        subject: 'Информатика',
                        rating: 5,
                        imageUser: '/image/works/user.svg',
                    }
                ]
            },
            
        ]
    })
})