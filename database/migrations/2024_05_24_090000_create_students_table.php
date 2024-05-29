<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('studentID');
            $table->unsignedBigInteger('userID');
            $table->foreign('userID')->references('id')->on('users');
            $table->string('matricID');
            $table->unsignedBigInteger('hostelID')->nullable();
            $table->foreign('hostelID')->references('hostelID')->on('hostels');
            $table->unsignedBigInteger('blockID')->nullable();
            $table->foreign('blockID')->references('blockID')->on('blocks');
            $table->unsignedBigInteger('roomID')->nullable();
            $table->foreign('roomID')->references('id')->on('rooms');
            $table->integer('merit');
            $table->integer('active'); // 0 for inactive, 1 for active, 2 for pending
            $table->string('firstRoomType')->nullable();
            $table->unsignedBigInteger('firstRoomBlock')->nullable();
            $table->foreign('firstRoomBlock')->references('blockID')->on('blocks');
            $table->unsignedBigInteger('firstRoomID')->nullable();
            $table->foreign('firstRoomID')->references('id')->on('rooms');
            $table->string('secondRoomType')->nullable();
            $table->unsignedBigInteger('secondRoomBlock')->nullable();
            $table->foreign('secondRoomBlock')->references('blockID')->on('blocks');
            $table->unsignedBigInteger('secondRoomID')->nullable();
            $table->foreign('secondRoomID')->references('id')->on('rooms');
            $table->string('thirdRoomType')->nullable();
            $table->unsignedBigInteger('thirdRoomBlock')->nullable();
            $table->foreign('thirdRoomBlock')->references('blockID')->on('blocks');
            $table->unsignedBigInteger('thirdRoomID')->nullable();
            $table->foreign('thirdRoomID')->references('id')->on('rooms');
            $table->unsignedBigInteger('roommate')->nullable();
            $table->foreign('roommate')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
