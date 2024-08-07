import React, { useState } from 'react';
import './UserCalendar.css';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState('');
  const [showCommentDropdown, setShowCommentDropdown] = useState(false);

  const handlePreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    // Fill in the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    // Fill in the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      calendarDays.push(day);
    }

    return calendarDays;
  };

  const hasComments = (day) => {
    const dateKey = day ? day.toLocaleDateString() : '';
    return comments[dateKey] && comments[dateKey].length > 0;
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
      setShowCommentDropdown(true);
    }
  };

  const handleAddComment = () => {
    const dateKey = selectedDate.toLocaleDateString();
    setComments({
      ...comments,
      [dateKey]: [...(comments[dateKey] || []), commentInput],
    });
    setCommentInput('');
    setShowCommentDropdown(false);
  };

  const renderComments = () => {
    const dateKey = selectedDate.toLocaleDateString();
    return (
      <div className="comments">
        <h3>Comments for {dateKey}</h3>
        <ul>
          {(comments[dateKey] || []).map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <button onClick={() => setShowCommentDropdown(!showCommentDropdown)}>Add Comment</button>
      </div>
    );
  };

  const renderCalendar = () => {
    const calendarDays = generateCalendar();

    return (
      <div className="calendar-container">
        <div className="my_calendar">
          <div className="header">
            <button onClick={handlePreviousMonth} className="nav-button">&lt;</button>
            <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button onClick={handleNextMonth} className="nav-button">&gt;</button>
          </div>
          <button onClick={handleToday} className="today-button">Today</button>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days">
            {calendarDays.map((day, index) => {
              const dateKey = day ? day.toLocaleDateString() : '';
              return (
                <div
                  key={index}
                  className={`day ${day && day.toLocaleDateString() === selectedDate.toLocaleDateString() ? 'selected' : ''} ${hasComments(day) ? 'highlighted' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day ? day.getDate() : ''}
                </div>
              );
            })}
          </div>
          {renderComments()}
        </div>
        {showCommentDropdown && (
          <div className="comment-dropdown">
            <h3>Add Comment for {selectedDate.toLocaleDateString()}</h3>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <div><button className="addcommentbtn" onClick={handleAddComment}>Add Comment</button></div>
            <div className="cancelbtn"><button onClick={() => setShowCommentDropdown(false)}>Cancel</button></div>
          </div>
        )}
      </div>
    );
  };

  const renderAllComments = () => {
    const allComments = Object.entries(comments).map(([date, commentsForDate]) => (
      <div key={date} className="comment-item">
        <div className="comment-date">{date}</div>
        <div className="comment-content">
          <ul>
            {commentsForDate.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    ));

    return (
      <div className="all-comments-container">
        <div className="all-comments">
          <h2>Comment History</h2>
          {allComments}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderCalendar()}
      {renderAllComments()}
    </div>
  );
};

export default UserCalendar;
