const app = new Vue({
    el: '#app',
    data: {
        contacts: [
            {
                id: 1,
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                id: 2,
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '03/20/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '03/20/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '03/20/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                id: 3,
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '03/28/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '03/28/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '03/28/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                id: 4,
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                id: 5,
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                id: 6,
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Ciao Claudia, hai novit???',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '01/10/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                id: 7,
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che ?? il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                id: 8,
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '01/10/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '01/10/2020 15:50:00',
                        message: 'No, l\'ho gi?? mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '01/10/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        current: 0,
        change: 0,
        userMessage: '',
        searchContact: '',
        writing: '',
        answers: [
            'Ok',
            'Va bene',
            'Non posso',
            'Scusa ma sono impegnato',
            'Il mio falegname con 30.000 lire la faceva meglio',
            'La peperonata alle sei del mattino?',
            'A volte dorme di pi?? lo sveglio che il dormiente'
        ]
    },
    methods: {
        send() {
            if(this.userMessage.trim() === '') {
                return
            } else {
                const answerMessage = this.answers[this.getRndInteger(0, this.answers.length - 1)]
                const newMessage = {
                    date: dayjs().format(),
                    message: this.userMessage,
                    status: 'sent'
                };
                const answer = {
                    date: dayjs().format(),
                    message: answerMessage,
                    status: 'received'
                }
                this.contacts[this.current].messages.push(newMessage);
                this.userMessage = '';
                // timer log in utente
                setTimeout(() => {
                    this.writing = 'Online';
                    // timer lettura messaggio
                    setTimeout(() => {
                        // timer scrittura risposta
                        this.writing = 'Sta scrivendo...';
                        //timer log out utente
                        setTimeout(() => {
                            this.contacts[this.current].messages.push(answer);
                            this.writing = 'Online'
                            setTimeout(() => {
                                this.writing = '';
                            }, 2000);
                        }, 2000)
                    }, 2000)
                }, 2000)
            }
            this.$refs.input.focus();
        },
        showChat(id) {
            this.change = this.filteredArray.findIndex((contact) => {
                return contact.id === id;
            });
            const i = this.contacts.findIndex((contact) => {
                return contact.id === id;
            });
            this.current = i;
        },
        showDate(item){
            return dayjs(item.date).format('HH:mm')
        },
        remove(m) {
            const i = this.contacts[this.current].messages.findIndex((contact) => {
                return contact.message === m;
            })
            this.contacts[this.current].messages.splice(i,1)
        },
        showLastMessage(contact) {
            let lastMessage = contact.messages[contact.messages.length - 1].message;
            if(contact.messages[contact.messages.length - 1].status === 'sent') {
                lastMessage = 'Tu: ' + lastMessage;   
            }
            return lastMessage
        },
        showLastTime(contact) {
            return dayjs(contact.messages[contact.messages.length - 1].date).format('DD/MM/YY HH:mm')
        },
        lastAccess() {
            // seleziono il contatto
            const contact = this.contacts[this.current];
            // creo un array contenente solo i messaggi ricevuti dal contatto
            const receivedMessages = contact.messages.filter((messages) =>
                messages.status === 'received'
            )
            // salvo la data dell'ultimo messaggio ricevuto
            const x = receivedMessages[receivedMessages.length - 1].date;
            // divido la data in giorno e ora
            let day = 'il ' + dayjs(x).format('DD/MM/YY');
            const time = dayjs(x).format('HH:mm');
            // controllo se l'ultimo accesso risale a oggi
            if(dayjs(x).format('DD/MM/YY') === dayjs().format('DD/MM/YY')) {
                day = 'oggi'
            }
            // creo la data da stampare
            const access = day + ' alle ' + time;
            return access
        },
        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
          }
    },
    computed: {
        filteredArray() {
            return this.contacts.filter((contact) => 
                contact.name.toLowerCase().includes(this.searchContact.toLowerCase())
            )
        }
    }
});