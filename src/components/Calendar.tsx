import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  unavailableDates?: Date[];
  onSelectDate?: (date: Date) => void;
  selectedDate?: Date;
}

export function Calendar({ unavailableDates = [], onSelectDate, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => 
      isSameDay(date, new Date(unavailableDate))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map(day => {
          const isUnavailable = isDateUnavailable(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDayToday = isToday(day);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => !isUnavailable && onSelectDate?.(day)}
              disabled={isUnavailable}
              className={`
                p-2 text-sm rounded-full
                ${!isSameMonth(day, currentMonth) && 'text-gray-300'}
                ${isUnavailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50'}
                ${isSelected && 'bg-blue-600 text-white hover:bg-blue-700'}
                ${isDayToday && !isSelected && 'border border-blue-600'}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}