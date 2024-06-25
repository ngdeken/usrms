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
        Schema::create('quotas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userID');
            $table->foreign('userID')->references('id')->on('users');
            $table->string('active')->default('pending'); //Pending //Active //Inactive
            $table->string('event')->nullable(); //Event file
            $table->string('firstRoomType')->nullable();
            $table->string('firstRoomBlock')->nullable();
            //$table->foreign('firstRoomBlock')->references('id')->on('blocks');
            $table->string('firstRoomID')->nullable();
            //$table->foreign('firstRoomID')->references('id')->on('rooms');
            $table->string('secondRoomType')->nullable();
            $table->string('secondRoomBlock')->nullable();
            //$table->foreign('secondRoomBlock')->references('id')->on('blocks');
            $table->string('secondRoomID')->nullable();
            //$table->foreign('secondRoomID')->references('id')->on('rooms');
            $table->string('thirdRoomType')->nullable();
            $table->string('thirdRoomBlock')->nullable();
           // $table->foreign('thirdRoomBlock')->references('id')->on('blocks');
            $table->string('thirdRoomID')->nullable();
          //  $table->foreign('thirdRoomID')->references('id')->on('rooms');
            $table->string('roommate')->nullable();
            $table->string('roommateMatric')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotas');
    }
};
