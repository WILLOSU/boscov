

const DatePickerStyles = createGlobalStyle`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ##757575;
    border-radius: 0.3rem;
    font-size: 1rem;
  }

  .react-datepicker {
    font-family: sans-serif; /* Ou a sua fonte padrão */
    border: 1px solid ##757575;
    border-radius: 0.3rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: #f0f0f0;
    padding: 0.8rem;
    border-bottom: 1px solid #757575;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .react-datepicker__navigation {
    border: none;
    background: none;
    padding: 0;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .react-datepicker__day {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0.2rem;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
  }

  .react-datepicker__day:hover,
  .react-datepicker__day--selected,
  .react-datepicker__day--today {
    background-color: #005954; /* Sua cor primária */
    color: #fff;
  }
`;