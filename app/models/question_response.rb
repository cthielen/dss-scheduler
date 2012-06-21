class QuestionResponse < ActiveRecord::Base
  attr_accessible :question_id, :reservation_id, :value
  
  belongs_to :question
  belongs_to :reservation
end
