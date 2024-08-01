import React, { useState, useEffect } from 'react';

const TypingGame = ({ language }) => {
    const [level, setLevel] = useState('very_easy');
    const [textIndex, setTextIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [highlightedText, setHighlightedText] = useState('');
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(null);

  const levels = ['very_easy', 'easy', 'medium', 'hard', 'very_hard'];
  const textLevels = {
      en: {
          very_easy: ["Hello.", "Good day."],
          easy: ["The quick brown fox.", "Lazy dogs are sleeping."],
          medium: ["This is a more challenging sentence.", "Keep practicing your typing skills."],
          hard: ["Typing accurately is key to success.", "She sells seashells by the seashore."],
          very_hard: ["To be, or not to be, that is the question.", "Whether 'tis nobler in the mind to suffer."]
        },
        zh: {
            very_easy: ["你好。", "早上好。"],
            easy: ["敏捷的棕狐。", "懒狗在睡觉。"],
            medium: ["这是一个更具挑战性的句子。", "继续练习你的写作技巧。"],
            hard: ["准确写作是成功的关键。", "她在海边卖海贝。"],
            very_hard: ["生存还是毁灭，这是一个问题。", "在心灵中受苦是否更高贵。"]
          },
        es: {
            very_easy: ["Hola.", "Buenos días."],
            easy: ["El zorro marrón rápido.", "Los perros perezosos duermen."],
            medium: ["Esta es una frase más desafiante.", "Sigue practicando tus habilidades de escritura."],
            hard: ["Escribir con precisión es clave para el éxito.", "Ella vende conchas en la orilla del mar."],
            very_hard: ["Ser o no ser, esa es la cuestión.", "Si es más noble en la mente sufrir."]
        },
        ar: {
            very_easy: ["مرحبا.", "صباح الخير."],
            easy: ["الثعلب البني السريع.", "الكلاب الكسولة نائمة."],
            medium: ["هذه جملة أكثر تحديًا.", "واصل التدرب على مهارات الكتابة الخاصة بك."],
            hard: ["الكتابة بدقة هي مفتاح النجاح.", "هي تبيع الأصداف على شاطئ البحر."],
            very_hard: ["أن تكون أو لا تكون، تلك هي المسألة.", "ما إذا كان النبلاء في العقل يعانون."]
        },
        pt: {
            very_easy: ["Olá.", "Bom dia."],
            easy: ["A raposa marrom rápida.", "Os cães preguiçosos estão dormindo."],
            medium: ["Esta é uma frase mais desafiadora.", "Continue praticando suas habilidades de escrita."],
            hard: ["Escrever com precisão é a chave para o sucesso.", "Ela vende conchas na beira do mar."],
            very_hard: ["Ser ou não ser, essa é a questão.", "Se é mais nobre na mente sofrer."]
        },
          fr: {
            very_easy: ["Bonjour.", "Bon matin."],
            easy: ["Le renard brun rapide.", "Les chiens paresseux dorment."],
            medium: ["Ceci est une phrase plus difficile.", "Continuez à pratiquer vos compétences en écriture."],
            hard: ["Écrire avec précision est la clé du succès.", "Elle vend des coquillages sur le bord de la mer."],
            very_hard: ["Être ou ne pas être, telle est la question.", "Si c'est plus noble dans l'esprit de souffrir."]
        },
        ja: {
            very_easy: ["こんにちは。", "おはようございます。"],
            easy: ["素早い茶色の狐。", "怠け者の犬が寝ています。"],
            medium: ["これはもっと挑戦的な文です。", "書くスキルを磨き続けてください。"],
            hard: ["正確に書くことは成功の鍵です。", "彼女は海岸で貝殻を売っています。"],
            very_hard: ["生きるべきか死ぬべきか、それが問題だ。", "心の中で苦しむことがより高貴であるかどうか。"]
        },
        ru: {
            very_easy: ["Привет.", "Доброе утро."],
            easy: ["Быстрая коричневая лиса.", "Ленивые собаки спят."],
            medium: ["Это более сложное предложение.", "Продолжайте практиковать свои навыки письма."],
            hard: ["Писать точно - ключ к успеху.", "Она продает ракушки на берегу моря."],
            very_hard: ["Быть или не быть, вот в чём вопрос.", "Более благородно ли страдать в уме."]
        },
        de: {
            very_easy: ["Hallo.", "Guten Morgen."],
            easy: ["Der schnelle braune Fuchs.", "Faul Hunde schlafen."],
            medium: ["Dies ist ein herausfordernderer Satz.", "Üben Sie weiter Ihre Schreibfähigkeiten."],
            hard: ["Genau schreiben ist der Schlüssel zum Erfolg.", "Sie verkauft Muscheln am Strand."],
            very_hard: ["Sein oder nicht sein, das ist die Frage.", "Ob es edler im Geist ist zu leiden."]
        },
        hi: {
            very_easy: ["नमस्ते।", "सुप्रभात।"],
            easy: ["तेज भूरे रंग की लोमड़ी।", "आलसी कुत्ते सो रहे हैं।"],
            medium: ["यह एक और चुनौतीपूर्ण वाक्य है।", "अपनी लेखन क्षमता को लगातार अभ्यास करते रहें।"],
            hard: ["सटीक लेखन सफलता की कुंजी है।", "वह समुद्र तट पर सीपियाँ बेचती है।"],
            very_hard: ["होना या न होना, यही सवाल है।", "मन में पीड़ित होना अधिक महान है।"]
        },
        ko: {
            very_easy: ["안녕하세요.", "좋은 아침입니다."],
            easy: ["빠른 갈색 여우.", "게으른 개가 자고 있습니다."],
            medium: ["이것은 더 도전적인 문장입니다.", "글쓰기 기술을 계속 연습하세요."],
            hard: ["정확하게 쓰는 것이 성공의 열쇠입니다.", "그녀는 바닷가에서 조개를 팔고 있습니다."],
            very_hard: ["존재하는 것과 존재하지 않는 것, 그것이 문제이다.", "마음속에서 고통받는 것이 더 고귀한가."]
        },
        id: {
            very_easy: ["Halo.", "Selamat pagi."],
            easy: ["Rubah cokelat cepat.", "Anjing malas sedang tidur."],
            medium: ["Ini adalah kalimat yang lebih menantang.", "Terus latih keterampilan menulis Anda."],
            hard: ["Menulis dengan akurat adalah kunci sukses.", "Dia menjual kerang di tepi laut."],
            very_hard: ["Menjadi atau tidak menjadi, itulah pertanyaannya.", "Apakah lebih mulia menderita dalam pikiran."]
        },

    };
    const targetText = textLevels[language][level][textIndex];

    useEffect(() => {
        setStartTime(new Date());
      }, [textIndex]);
    
      useEffect(() => {
        let display = '';
        let correctChars = 0;
    
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i] === targetText[i]) {
            display += `<span class="correct">${userInput[i]}</span>`;
            correctChars++;
          } else {
            display += `<span class="incorrect">${userInput[i]}</span>`;
          }
        }
    
        setHighlightedText(display + targetText.slice(userInput.length));
    
        if (userInput === targetText) {
          const timeTaken = (new Date() - startTime) / 1000; // Tiempo en segundos
          calculateScore(timeTaken);
          setTimeout(() => {
            nextLevel();
          }, 1000);
        }
      }, [userInput, targetText]);
    
      const calculateScore = (timeTaken) => {
        const baseScore = 1000;
        const timeBonus = Math.max(0, 1000 - timeTaken * 10);
        const levelMultiplier = levels.indexOf(level) + 1;
        const newScore = (baseScore + timeBonus) * levelMultiplier;
        setScore(score + newScore);
      };
    
      const nextLevel = () => {
        if (textIndex < textLevels[language][level].length - 1) {
          setTextIndex(textIndex + 1);
        } else {
          setTextIndex(0);
          const nextLevelIndex = levels.indexOf(level) + 1;
          if (nextLevelIndex < levels.length) {
            setLevel(levels[nextLevelIndex]);
          } else {
            alert(`¡Felicidades, has completado todos los niveles con un puntaje de ${score}!`);
            setLevel('very_easy');
            setScore(0);
          }
        }
        setUserInput('');
      };
    
      return (
        <div className="typing-game">
          <p dangerouslySetInnerHTML={{ __html: highlightedText }}></p>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe aquí..."
          />
          <div className="score">
            <p>Puntaje: {score}</p>
          </div>
        </div>
      );
    };
    
    export default TypingGame;